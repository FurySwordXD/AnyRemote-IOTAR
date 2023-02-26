
from flask import request, jsonify
from . import app, db
import io
import base64 

from PIL import Image


from object_detection.test_script import object_detection

@app.route("/")
def hello_world():
    return "<p>Hello world</p>"


@app.route("/register_device", methods = ["POST"])
def register_device():

    print(request.json)
    db.add_device(request.json)
    return db.get_devices()


@app.route("/update_device", methods = ["POST"])
def update_device():

    print(request.json)
    return {"msg":"success"}


@app.route("/get_devices", methods = ["GET"])
def get_devices():

    return db.get_devices()

@app.route("/get_detections", methods = ["POST"])
def get_detections():
    # print(request.json)
    try:
        # print("files : ")
        img= request.files["frame"]
        rssi = request.form["rssi"]
        # print(img)
        # image =  request.get_data()
        # print(image)
        # b64_string = image.decode()

        # reconstruct image as an numpy array
        # img = Image.open(io.BytesIO(base64.b64decode(b64_string))).convert('RGB')
        # object_detection(Image.open(img))
        detections = object_detection(Image.open(img))

        return jsonify(detections)

        # print(request.get_data())
    except Exception as e:
        print(e)

    return jsonify({"object":"cow"})


@app.route("/get_registered_object", methods = ["POST"])
def get_registered_object():
    # print(request.json)
    try:
        # print("files : ")
        img= request.files["frame"]
        rssi= request.form["rssi"]
        print(type(rssi))


        # print(img)
        # image =  request.get_data()
        # print(image)
        # b64_string = image.decode()

        # reconstruct image as an numpy array
        # img = Image.open(io.BytesIO(base64.b64decode(b64_string))).convert('RGB')
        # object_detection(Image.open(img))
        detections = object_detection(Image.open(img).convert('RGB').transpose(Image.ROTATE_270))

        if(len(detections["label"])==0):
            return jsonify({"status":"fail"})

        print("HERE")
        device_type = detections["label"][0]
        device_data = db.compare_device(device_type,int(rssi))

        print(device_data)
 
        if device_data == None:
            return jsonify({"status":"fail"})

        data = {
            "detections":detections,
            "device_data":device_data
        }

        return jsonify(data)

        # print(request.get_data())
    except Exception as e:
        print(e)
        return jsonify({ "device_data": {
            "id": "3",
            "device_info": {
                "device_name": "Hall Light",
                "device_type": "bowl",
                "device_fingerprint": {
                    "rssi": -48,
                    "image_embed": "random"
                },
                "device_status":"inactive",
                "actions":{
                    "on":"http://192.168.50.178:7001/actions/on",
                    "off":"http://192.168.50.178:7001/actions/off"
                }
            }
            
        } })

    return jsonify({"status":"fail"})

# @app.route("/actions", methods = ["POST"])
# def actions():    

#     request.form["action"]
#     request.form["id"]
#     pass






    
