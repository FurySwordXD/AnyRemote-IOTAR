from flask import Flask

from data_handler.handler import DBHandler


db = DBHandler()

app = Flask(__name__)