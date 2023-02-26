# Python program to explain cv2.imshow() method
  
# importing cv2
import cv2
import time
import threading , queue
# path
bpath = r'black-screen.png'
wpath = r'white-screen.jpg'

FLAG = False

  
# Reading an image in default mode
bimage = cv2.imread(bpath)
wimage = cv2.imread(wpath)
from test_server import server
  
import cv2

cap = cv2.VideoCapture('5min.mp4')
if not cap.isOpened():
    print("Error opening video")


from multiprocessing.connection import Listener

def goodbye():
    # print('Goodbye %s, it was %s to meet you.' % (name, adjective))
    global FLAG
    FLAG = True
    cv2.destroyAllWindows()

import atexit

atexit.register(goodbye)

def main():
    global FLAG
    while(cap.isOpened()):
        status, frame = cap.read()
        # address = ('localhost', 6000)     # family is deduced to be 'AF_INET'
        # listener = Listener(address, authkey=b'secret password')
        # conn = listener.accept()
        # print('connection accepted from', listener.last_accepted)
       
        # msg = que.get()
        # # do something with msg
        # # que.put(msg)
        # # print(msg)
        # if(msg == "on"):
        #     FLAG = True
        # if(msg == "off"):
        #     FLAG = False
       
       
     

        if status:
            cv2.imshow('frame', frame)
        key = cv2.waitKey(5)

        if key == 32:
            cv2.waitKey()
        elif key == ord('q') or FLAG:
            break
    cv2.destroyAllWindows()


if __name__ == "__main__":
    # try: 
    #     q = queue.Queue()
    #     msg =  None
    #     thread1 = threading.Thread(target=main,args=(q,))
    #     thread2 = threading.Thread(target=server,args=(q,))
    #     # main()
    #     print("setup")
    #     thread1.start()
    #     thread2.start()
    # finally: 
    #     # fc.stop()
    #     pass

    main()