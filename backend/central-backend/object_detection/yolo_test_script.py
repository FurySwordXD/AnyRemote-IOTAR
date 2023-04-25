


# import cv2
# import matplotlib.pyplot as plt
# import cvlib as cv
# from cvlib.object_detection import draw_bbox
import numpy as np

import torch
model = torch.hub.load('ultralytics/yolov5', 'custom', path='C:/Users/nrogu/Documents/GitHub/AnyRemote-IOTAR/backend/central-backend/object_detection/best.pt')

def object_detection(im):

    # im = cv2.imread(image)
    im = np.array(im)
    results = model(im)
    print(results)
    print(results.pandas().xyxy[0])

    if len(results.pandas().xyxy[0]) == 0:
        print("no data")
        data = {
        "bbox":[],
        "label":[],
        "conf":[],
        "message": str("Object detected: "+str("None"))
        }
        return data
    boxes = list(results.pandas().xyxy[0].values[0])
    # bbox, label, conf = cv.detect_common_objects(im)
    # output_image = draw_bbox(im, bbox, label, conf)
   
    # plt.imshow(output_image)
    # plt.show()

    data = {
        "bbox":boxes[0:4],
        "label":[boxes[6]],
        "conf":boxes[4],
        "message": str("Object detected: "+str(boxes[6]))
    }
    print(data)
    return data
