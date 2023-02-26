from flask import Flask

from flaskapp.views import *
from flaskapp import app







if __name__ == '__main__':
    app.run(port=5001,host = "0.0.0.0", debug=True)