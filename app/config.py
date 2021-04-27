import os

class Config(object):
    """Base Config Object"""
    DEBUG = False
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'bh2eyg81237duhsa734qjn$'
    SQLALCHEMY_DATABASE_URI = os.environ.get('MY_DATABASE_URL')  or 'postgresql://nathan:@localhost/project2'
    SQLALCHEMY_TRACK_MODIFICATIONS = False # This is just here to suppress a warning from SQLAlchemy as it will soon be removed
    MAIL_SERVER = os.environ.get('MAIL_SERVER') or 'localhost'
    MAIL_PORT = os.environ.get('MAIL_PORT') or '25'
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    PROFILE_UPLOAD_FOLDER = os.environ.get('PROFILE_UPLOAD_FOLDER') or './profileUploads'
    CAR_UPLOAD_FOLDER = os.environ.get('CAR_UPLOAD_FOLDER') or './carUploads'
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

class DevelopmentConfig(Config):
    """Development Config that extends the Base Config Object"""
    DEVELOPMENT = True
    DEBUG = True

class ProductionConfig(Config):
    """Production Config that extends the Base Config Object"""
    DEBUG = False