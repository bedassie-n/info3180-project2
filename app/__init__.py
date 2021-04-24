
from flask import Flask
from .config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect

app = Flask(__name__)
#csrf = CSRFProtect(app)
app.config.from_object(Config)
#api = restful.Api(app, decorators=[csrf.exempt])
#app.config['JWT_COOKIE_CSRF_PROTECT'] = False

db = SQLAlchemy(app)

from app import views, models
from app.models import Users, Favourites, Cars
