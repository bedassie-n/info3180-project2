"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""
import os
from app import app, db
from flask import render_template, request, redirect, url_for, flash, send_from_directory
from werkzeug.utils import secure_filename
from app.models import Users, Favourites, Cars
from flask import jsonify

import jwt
from flask import _request_ctx_stack
from functools import wraps



###
# Frontend Routing for your application.
###



###
# API Routing for your application.
###
"""     API: AUTHENTICATION AND JWT     """
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


"""              API: CARS              """

@app.route('/api/cars', methods = 'GET')
# @requires_auth
def getAllCars():
    # consider that youll be sending 
    cars = db.session.query(Cars).all()
    result = []
    for c in cars:
        id = c.id
        description = c.description
        year = c.year
        make = c.make
        model = c.model
        color = c.colour
        transmission = c.transmission
        car_type = c.car_type
        price = c.price
        photo = c.photo
        user_id = c.user_id
        cresult = [{'id': id, "description": description, "make": make, "model": model, "color": color, "year": year, "transmission": transmission, "car_type": car_type, "price": price, "photo": photo, "user_id": user_id}]
        result.append(cresult)
    
    if len(result) == 0:
        # idealy need to figure out how to check the user is authenticated and token valid for a 401
        return jsonify({'error': "Access token is missing or invalid"}), 401
    else:
        return jsonify({'result': result}), 200

@app.route('/api/cars/<car_id>', methods = 'GET')
# @requires_auth
def getcar(car_id):
    car = Cars.query.filter_by(car_id = car_id)
    print(type(car))
    
    result = [
        {
            "id": id, 
            "description": c.description, 
            "make": c.make, 
            "model": c.model, 
            "color": c.color, 
            "year": c.year, 
            "transmission": c.transmission, 
            "car_type": c.car_type, 
            "price": c.price, 
            "photo": c.photo, 
            "user_id": c.user_id
        } for c in car]

    if len(result) == 0:
        # idealy need to figure out how to check the user is authenticated and token valid for a 401
        return jsonify({'error': "Access token is missing or invalid"}), 401
    else:
        return jsonify({'result':result}), 200


# @app.route('/api/cars/<car_id>/favourite', methods= "PUT")
# @requires_auth
""" def addCarToFav(car_id):
    if <check token >:
        get current user's id 
        user_id = current_user.id
        favs = Favorites(car_id, user_id)
        db.sessions.add(favs) OR 
         db.session.add(Favorites(car_id=car_id, user_id=user_id)
         db.session.commit()
        return jsonify({"message"="Car Successfully Favourited", "car_id":user_id}), 200
    else:
       return jsonify({error": "Access token is missing or invalid"}), 401 """
       


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
    app.run(debug=True, host="0.0.0.0", port="8080")
