"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""
import os
from app import app, db, login_manager
from flask import render_template, request, redirect, url_for, flash, send_from_directory, abort, jsonify, g, make_response
from flask_login import login_user, logout_user, current_user, login_required
from app.models import Users, Favourites, Cars
from werkzeug.security import check_password_hash
from werkzeug.utils import secure_filename
#from datetime import datetime, timezone
import datetime

# Using JWT
import jwt
from flask import _request_ctx_stack
from functools import wraps
import datetime

"""                              JWT                          """
# Create a JWT @requires_auth decorator
# This decorator can be used to denote that a specific route should check
# for a valid JWT token before displaying the contents of that route.
def requires_auth(f):
  @wraps(f)
  def decorated(*args, **kwargs):
    auth = request.headers.get('Authorization', None) # or request.cookies.get('token', None)

    if not auth:
      # return jsonify({'code': 'authorization_header_missing', 'description': 'Authorization header is expected'}), 401
      return jsonify({'result': "Access token is missing or invalid"}), 401

    parts = auth.split()

    if parts[0].lower() != 'bearer':
      # return jsonify({'code': 'invalid_header', 'description': 'Authorization header must start with Bearer'}), 401
      return jsonify({'result': "Access token is missing or invalid"}), 401
    elif len(parts) == 1:
      # return jsonify({'code': 'invalid_header', 'description': 'Token not found'}), 401
      return jsonify({'result': "Access token is missing or invalid"}), 401
    elif len(parts) > 2:
      # return jsonify({'code': 'invalid_header', 'description': 'Authorization header must be Bearer + \s + token'}), 401
      return jsonify({'result': "Access token is missing or invalid"}), 401

    token = parts[1]
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])

    except jwt.ExpiredSignatureError:
        # return jsonify({'code': 'token_expired', 'description': 'token is expired'}), 401
        return jsonify({'result': "Access token is missing or invalid"}), 401
    except jwt.DecodeError:
        # return jsonify({'code': 'token_invalid_signature', 'description': 'Token signature is invalid'}), 401
        return jsonify({'result': "Access token is missing or invalid"}), 401

    g.current_user = user = payload
    return f(*args, **kwargs)

  return decorated


###
# Routing for your application.
###
"""              API: AUTHENTICATION & SEARCH              """

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

    if request.form: #TBD:update to check for essentials
        # get photo filename
        rawPhoto = request.files['photo']
        filename = secure_filename(rawPhoto.filename)
        rawPhoto.save(os.path.join(
            app.config['PROFILE_UPLOAD_FOLDER'], filename
        ))
        
        # check if user already exists in database
        if Users.query.filter_by(username = request.form['username']).first() \
            or Users.query.filter_by(email = request.form['email']).first():
                 return jsonify({'message': 'Username or email already exists.'}), 409
        else:
            # create user 
            user = Users (
                username = request.form['username'],
                password = request.form['password'], 
                name = request.form['name'],
                email = request.form['email'],
                location = request.form.get('location', ""),
                biography = request.form.get('biography', ""),
                # photo = request.form.get('photo', ""),
                # photo = app.config['PROFILE_UPLOAD_FOLDER'] + "/" + filename, #gives user/prof..Fil...
                # photo = "profileUploads/" + filename, #gives user/pr.../..
                photo = "../../../profileUploads/" + filename,
                date_joined =  datetime.datetime.now(datetime.timezone.utc)
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
            # return jsonify({'user': userResult}), 201
            return jsonify({'id': newUser.id, \
                            'username': newUser.username,   \
                            'name': newUser.name,   \
                            'email': newUser.email, \
                            'location': newUser.location,   \
                            'biography': newUser.biography, \
                            'photo': newUser.photo, \
                            'date_joined': newUser.date_joined}), 201
    else:
    #    abort(400) #bad request http code
        return jsonify({'user': []}), 400


@app.route('/api/auth/login', methods=['POST'])
def login(): 
    if not request.json or not 'username' in request.json or not 'password' in request.json:
       abort(400) #bad request http code
    else:
        username = request.json['username']
        password = request.json['password']

        user = Users.query.filter_by(username=username).first()

        if user is not None and check_password_hash(user.password, password):
            login_user(user)

            #generate JWT token
            payload = {
                'sub': user.id, #technical identifier of the user
                'name': user.name,
                'iat': datetime.datetime.now(datetime.timezone.utc), #current time -- generate timestamp
                'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=10) #token expires in 10 mins -- generate timestamp
            }
            token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')

            # #build api response 
            # result = {
            #     'message': 'Login successful',
            #     'token': token
            # }

            #send api response
            return jsonify({'message': 'Login successful', 'token': token}), 200
        elif user is None or not check_password_hash(user.password, password):
            return jsonify({'message': 'Login unsuccessful'}), 404
        else:
            return jsonify({'message': 'Server may have encountered an error'}), 500
        

# user_loader callback. This callback is used to reload the user object from
# the user ID stored in the session
@login_manager.user_loader
def load_user(id):
    return Users.query.get(int(id))


@app.route('/api/auth/logout', methods=['POST'])
@requires_auth
def logout(): 
    logout_user()
    #build api response 
    # result = {
    #     'message': 'Log out successful'
    # }

    return jsonify({'message': 'Log out successful'}), 200

@app.route('/api/search', methods=['GET'])
@requires_auth
def search(): 
    make = request.args.get("make")
    model = request.args.get("model")

    if make is not None and model is not None:      #both make and model
        cars = Cars.query.filter_by(make = make).filter_by(model=model).all()
              
    elif request.args.get("make") is not None and request.args.get("model") is None:    #only make
        cars = Cars.query.filter_by(make = make).all()
        
    elif request.args.get("make") is None and request.args.get("model") is not None:   #only model
        cars = Cars.query.filter_by(model=model).all()
     
    else:    #neither
        return jsonify({'result': 'Make and model missing'}), 404 #Not Found

    #if cars found matching criteria
    if cars is not None:
        #build api response with car data
        carResults = []

        for car in cars:
            carResults.append( 
                {
                    'id': car.id, 
                    'description': car.description,
                    'year': car.year,
                    'make': car.make,
                    'model': car.model,
                    'colour': car.colour,
                    'transmission': car.transmission,
                    'car_type': car.car_type,
                    'price': car.price,
                    'photo': car.photo,
                    'user_id': car.user_id
                }
            )

        #send api response
        return jsonify({'result': carResults}), 200
    else:
        return jsonify({'result': 'Car not found'}), 404 #Not Found



"""              API: CARS              """

@app.route('/api/cars', methods = ['GET'])
@requires_auth
def getAllCars():
    if request.method == 'GET':
        cars = db.session.query(Cars).all()
        print(cars)
        result = []
        if len(cars) != 0:
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
                cresult = {'id': id, "description": description, "make": make, "model": model, "color": color, "year": year, "transmission": transmission, "car_type": car_type, "price": price, "photo": photo, "user_id": user_id}
                result.append(cresult)
            return jsonify({'result': result}), 200
        elif len(cars) == 0: 
            return jsonify({"result": cars}), 404
        # else: 
        #     # idealy need to figure out how to check the user is authenticated and token valid for a 401
        #     return jsonify({'result': "Access token is missing or invalid"}), 401


@app.route('/api/cars', methods = ['POST'])
@requires_auth
def addCars():
    # # consider that youll be sending 
    # if request.form:
    # #create new car details
    #     car = Cars(
    #         description = request.form['description'],
    #         make = request.form['make'],
    #         model = request.form['model'],
    #         colour = request.form['color'],
    #         year = request.form['year'],
    #         transmission = request.form['transmission'],
    #         car_type = request.form['car_type'],
    #         price = request.form['price'],
    #         photo = request.form.get('photo',""),
    #         user_id = request.form['user_id']
    #     )

    #     #add car to db
    #     db.session.add(car)
    #     db.session.commit()

    #     return jsonify({"result": "Car successfully Created"}), 201
    # else:
    #     return jsonify({'result':[]}), 400

    if request.form:
        # get photo filename
        rawCarPhoto = request.files['photo']
        carFilename = secure_filename(rawCarPhoto.filename)
        rawCarPhoto.save(os.path.join(
            app.config['CAR_UPLOAD_FOLDER'], carFilename
        ))
        
        # get photo path
        # carPhotoPath = os.path.join(
        #     app.config['CAR_UPLOAD_FOLDER'], carFilename
        # )

        # get photo path
        carPhotoPath = "../../../carUploads/" + carFilename

        # check if car already exists in database 
        # for a user to add a car, it must have at least one attribute that differs from all other cars
        if Cars.query.filter_by(description = request.form['description']).first() \
            and Cars.query.filter_by(year = request.form['year']).first() \
            and Cars.query.filter_by(make = request.form['make']).first() \
            and Cars.query.filter_by(model = request.form['model']).first() \
            and Cars.query.filter_by(colour = request.form['colour']).first() \
            and Cars.query.filter_by(transmission = request.form['transmission']).first() \
            and Cars.query.filter_by(car_type = request.form['car_type']).first() \
            and Cars.query.filter_by(price = request.form['price']).first() \
            and Cars.query.filter_by(photo = carPhotoPath).first():
            # and Cars.query.filter_by(user_id = request.json['user_id']).first() :
                return jsonify({'message': 'Car already exists.'}), 409
        else:
            car = Cars(
                description = request.form['description'],
                year = request.form['year'],
                make = request.form['make'],
                model = request.form['model'],
                colour = request.form['colour'],
                transmission = request.form['transmission'],
                car_type = request.form['car_type'],
                price = request.form['price'],
                # photo = request.json.get('photo', ""),
                photo = carPhotoPath,
                user_id = request.form['user_id']
            )

            #add car to db
            db.session.add(car)
            db.session.commit()

            #get the car from the db (using description, user_id and photo to identify)
            newCar = Cars.query.filter_by(description = request.form['description']) \
                                .filter_by(user_id = request.form['user_id']) \
                                .filter_by(photo = carPhotoPath) \
                                .first()

            #build api response with car data
            # carResult = {
            #     'id': newCar.id, 
            #     'description': newCar.description,
            #     'year': newCar.year,
            #     'make': newCar.make,
            #     'model': newCar.model,
            #     'colour': newCar.colour,
            #     'transmission': newCar.transmission,
            #     'car_type': newCar.car_type,
            #     'price': newCar.price,
            #     'photo': newCar.photo,
            #     'user_id': newCar.user_id
            # }

            #send api response
            # return jsonify({'car': carResult}), 201
            return jsonify({'id': newCar.id, 
                            'description': newCar.description,  \
                            'year': newCar.year,    \
                            'make': newCar.make,    \
                            'model': newCar.model,  \
                            'colour': newCar.colour,    \
                            'transmission': newCar.transmission,    \
                            'car_type': newCar.car_type,    \
                            'price': newCar.price,  \
                            'photo': newCar.photo,  \
                            'user_id': newCar.user_id}), 201
    else:
    #    abort(400) #bad request http code
        return jsonify({'car': []}), 400


@app.route('/api/cars/<car_id>', methods = ['GET'])
@requires_auth
def getcar(car_id):
    car = Cars.query.filter_by(id = car_id).all()  # .all() is used on the BaseQuery to return an array for the results, allowing us to evaluate if we got no reult

    if len(car) !=0:
        for c in car:
            cid = c.id
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
   
        #result = {'id': cid, "description": description, "make": make, "model": model, "color": color, "year": year, "transmission": transmission, "car_type": car_type, "price": price, "photo": photo, "user_id": user_id}
        #return jsonify({'result':result}), 200
        return jsonify({'id': cid, "description": description, "make": make, "model": model, "color": color, "year": year, "transmission": transmission, "car_type": car_type, "price": price, "photo": photo, "user_id": user_id}), 200
    elif len(car) == 0: 
        return jsonify({"result": car}), 404
    # else:
    #     return jsonify({'result': "Access token is missing or invalid"}), 401
        

@app.route('/api/cars/<car_id>/unfavourite', methods= ["POST"])
@requires_auth
def rmvCarFromFav(car_id):
    if g.current_user:
        user_id = (g.current_user)['sub']
        # favToDel = Favourites.query.filter_by(car_id=car_id).first()
        favToDel = db.session.query(Favourites).filter_by(car_id=car_id, user_id = user_id)
        # favToDel = Favourites.query.filter_by(car_id=car_id, user_id=user_id)
    
        db.session.delete(favToDel)
        db.session.commit()

        return jsonify({"message":"Car Successfully UnFavourited", "car_id":car_id}), 200
    else:
       return jsonify({"result": "Access token is missing or invalid"}), 401 


@app.route('/api/cars/<car_id>/favourites', methods= ["POST"])
@requires_auth
def addCarToFav(car_id):
    if g.current_user:
        if Favourites.query.filter_by(user_id = (g.current_user)['sub'], car_id = car_id):
            return jsonify({"message": "Conflict! Car cannot be favourited twice"}), 409
        else: 
            user_id = (g.current_user)['sub']
            db.session.add(Favourites(car_id=car_id, user_id=user_id)) 
            db.session.commit()
            return jsonify({"message":"Car Successfully Favourited", "car_id":car_id}), 200
    else:
       return jsonify({"result": "Access token is missing or invalid"}), 401

"""              API: PROFILE MANAGEMENT              """

@app.route('/api/users/<user_id>', methods = ['GET'])
# @requires_auth
def getUser(user_id):
    user = Users.query.filter_by(id = user_id).all()
    if len(user) !=0:
        for u in user:
            uid = u.id
            username = u.username
            name = u.name
            email = u.email
            location = u.location
            biography = u.biography
            photo = u.photo
            date_joined = u.date_joined

        # result = {'id': uid, "username": username, "password": password, "name": name, "email": email, "location": location, "biography": biography, "photo": photo, "date_joined": date_joined}
        # return jsonify({'result':result}), 200
        return jsonify({'id': uid, "username": username, "name": name, "email": email, "location": location, "biography": biography, "photo": photo, "date_joined": date_joined}), 200
    elif len(user) == 0: 
        return jsonify({"result": user}), 404
    # else:
    #     # idealy need to figure out how to check the user is authenticated and token valid for a 401
    #     return jsonify({'result': "Access token is missing or invalid"}), 401


@app.route('/api/users/<user_id>/favourites', methods = ['GET'])
# @requires_auth
def getUserFavourites(user_id):
    fave = Favourites.query.filter_by(user_id = user_id).all()
    
    result = []
    if len(fave) !=0:
        for f in fave:
            carid = f.car_id
            car = Cars.query.filter_by(id = carid).first()
            id = car.id
            description = car.description
            year = car.year
            make = car.make
            model = car.model
            colour = car.colour
            transmission = car.transmission
            car_type = car.car_type
            price = car.price
            photo = car.photo
            user_id = car.user_id

            fresult = {"id": id, "description": description, "year": year, "make": make, "mode": model, "colour": colour, "transmission": transmission, "car_type": car_type, "price": price, "photo": photo, "user_id": user_id}
            result.append(fresult)
        return jsonify({'result':result}), 200
    elif len(fave) == 0: 
        return jsonify({"result": result}), 404


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


@app.route('/profileUploads/<filename>')
def get_profile_image(filename):
    return send_from_directory(os.path.join('..', app.config['PROFILE_UPLOAD_FOLDER']), filename)

@app.route('/carUploads/<filename>')
def get_car_image(filename):
    return send_from_directory(os.path.join('..', app.config['CAR_UPLOAD_FOLDER']), filename)


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
