
from flask import request, jsonify
from . import app
import io
import base64 

import os, signal

from PIL import Image
# from .screen import FLAG
# import pyautogui

# import keyboard

from multiprocessing.connection import Client
import threading
import subprocess
import time
import cv2
# argument = '...'
# proc = subprocess.Popen(['python', 'bar.py', argument], shell=True)
# time.sleep(3) # <-- There's no time.wait, but time.sleep.
pid = None

proc = None

# address = ('localhost', 6000)
# conn = Client(address, authkey=b'secret password')

# from object_detection.test_script import object_detection

@app.route("/")
def hello_world():
    return "<p>Hello world</p>"




    
