


import cv2
import matplotlib.pyplot as plt
import cvlib as cv
from cvlib.object_detection import draw_bbox
import numpy as np

def object_detection(im):

    # im = cv2.imread(image)
    im = np.array(im)
    bbox, label, conf = cv.detect_common_objects(im)
    output_image = draw_bbox(im, bbox, label, conf)
   
    # plt.imshow(output_image)
    # plt.show()

    data = {
        "bbox":bbox,
        "label":label,
        "conf":conf,
        "message": str("Object detected: "+label[0])
    }
    print(data)
    return data
