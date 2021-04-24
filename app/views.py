"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""
import os
from datetime import datetime, timezone
from app import app, db
from flask import render_template, request, redirect, url_for, flash, send_from_directory, abort, jsonify, g, make_response
from werkzeug.utils import secure_filename
from app.models import Users, Favourites, Cars


"""     JWT     """
""" def requires_auth(f):
  @wraps(f)
  def decorated(*args, **kwargs):
    auth = request.headers.get('Authorization', None) # or request.cookies.get('token', None)
    if not auth:
      return jsonify({'code': 'authorization_header_missing', 'description': 'Authorization header is expected'}), 401
    parts = auth.split()
    if parts[0].lower() != 'bearer':
      return jsonify({'code': 'invalid_header', 'description': 'Authorization header must start with Bearer'}), 401
    elif len(parts) == 1:
      return jsonify({'code': 'invalid_header', 'description': 'Token not found'}), 401
    elif len(parts) > 2:
      return jsonify({'code': 'invalid_header', 'description': 'Authorization header must be Bearer + \s + token'}), 401
    token = parts[1]
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return jsonify({'code': 'token_expired', 'description': 'token is expired'}), 401
    except jwt.DecodeError:
        return jsonify({'code': 'token_invalid_signature', 'description': 'Token signature is invalid'}), 401
    g.current_user = user = payload
    return f(*args, **kwargs)
  return decorated """

###
# Routing for your application.
###
"""              API: AUTHENTICATION              """

# This route doesn't require a JWT
@app.route('/api/register', methods=['POST'])
def register(): 
    # if the request data is not there
    # or any of the username/password/name/email is missing
    # respond with a bad request code and stop registration
    # if not request.json: # or not 'username' in request.json or not 'password' in request.json or not 'name' in request.json or not 'email' in request.json:
    #    abort(400) #bad request http code
    #if not request.form: # or not 'username' in request.form or not 'password' in request.form or not 'name' in request.form or not 'email' in request.form:
     #  abort(400) #bad request http code

    if request.form:
        # create user 
        user = Users (
            username = request.form['username'],
            password = request.form['password'], 
            name = request.form['name'],
            email = request.form['email'],
            location = request.form.get('location', ""),
            biography = request.form.get('biography', ""),
            photo = request.form.get('photo', ""),
            date_joined =  datetime.now(timezone.utc)
        )

        #add user to db
        db.session.add(user)
        db.session.commit()

        #get the user from the db
        newUser = Users.query.filter_by(username = request.form['username']).first()

        #build api response with user data
        userResult = {
            'id': newUser.id, 
            'username': newUser.username,
            'name': newUser.name,
            'email': newUser.email,
            'location': newUser.location,
            'biography': newUser.biography,
            'photo': newUser.photo,
            'date_joined': newUser.date_joined
        }

        #send api response
        return jsonify({'user': userResult}), 201
    else:
    #     abort(400) #bad request http code
          return jsonify({'user': []}), 200

# Please create all new routes and view functions above this route.
# This route is now our catch all route for our VueJS single page
# application.
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    """
    Because we use HTML5 history mode in vue-router we need to configure our
    web server to redirect all routes to index.html. Hence the additional route
    "/<path:path".
    Also we will render the initial webpage and then let VueJS take control.
    """
    return render_template('index.html')


@app.route('/uploads/<filename>')
def get_image(filename):
    return send_from_directory(os.path.join('..', app.config['UPLOAD_FOLDER']), filename)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# Here we define a function to collect form errors from Flask-WTF
# which we can later use
def form_errors(form):
    error_messages = []
    """Collects form errors"""
    for field, errors in form.errors.items():
        for error in errors:
            message = u"Error in the %s field - %s" % (
                    getattr(form, field).label.text,
                    error
                )
            error_messages.append(message)

    return error_messages


###
# The functions below should be applicable to all Flask apps.
###


@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True, host="127.0.0.1", port="8079")
