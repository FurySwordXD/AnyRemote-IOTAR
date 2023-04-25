import numpy as np
import cv2

# Open a sample video available in sample-videos
# cap = cv2.VideoCapture('rtsp://192.168.50.86:8080/ht64_pcm.sdp')
cap = cv2.VideoCapture('http://192.168.50.86:8080/video')

#if not vcap.isOpened():
#    print "File Cannot be Opened"

# while(True):
#     # Capture frame-by-frame
#     ret, frame = vcap.read()
#     #print cap.isOpened(), ret
#     if frame is not None:
#         # Display the resulting frame
#         cv2.imshow('frame',frame)
#         # Press q to close the video windows before it ends if you want
#         if cv2.waitKey(22) & 0xFF == ord('q'):
#             break
#     else:
#         print("Frame is None")
#         break

# # When everything done, release the capture
# vcap.release()
# cv2.destroyAllWindows()
# print("Video stop")


while(cap.isOpened()):
    try:
        ret, image = cap.read()    
        # loadedImage = cv2.imdecode(image, cv2.IMREAD_COLOR)
        cv2.imshow('frame',image)
    except Exception as e:
        print(e)
        print("failed")
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()