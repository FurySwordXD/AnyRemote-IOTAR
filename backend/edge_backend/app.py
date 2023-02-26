from flask import Flask

from flaskapp.views import *
from flaskapp import app
import threading, cv2

play_video = False

def render_video():
    global play_video
    while True:
        cv2.destroyAllWindows()
        
        if not play_video:            
            continue

        cap = cv2.VideoCapture('5min.mp4')
        while(cap.isOpened() and play_video):
            status, frame = cap.read()

            if status:
                cv2.imshow('frame', frame)
            key = cv2.waitKey(5)

            if key == 32:
                cv2.waitKey()
            elif key == ord('q'):
                break        



@app.route("/actions/on", methods = ["POST", "GET"])
def actions_on():
    global proc, play_video
    global pid
    print("switched on")

    play_video = True

    # pyautogui.press('space')
    # keyboard.write('space',delay=0)
    # conn.send("on")
    # argument = '...'
    # proc = subprocess.Popen(['python', 'screen.py', argument], shell=True, stdin=subprocess.PIPE, text=True)
    # time.sleep(3) # <-- There's no time.wait, but time.sleep.
    # pid = proc.pid # <

    return {"status":"on"}

    # pass

@app.route("/actions/off", methods = ["POST", "GET"])
def actions_off():
    print("switched off")

    global proc, play_video
    global pid

    play_video = False
    # if(proc is not None):
    #     print("terminating")
    #     # proc.communicate("q")
    #     proc.terminate()
    #     print("terminated")

        # os.kill(pid, signal.SIGINT)
    
    # conn.send("off")
    

    return {"status":"off"}

def run_flask():
    app.run(port=6001,host = "0.0.0.0", debug=False)

if __name__ == '__main__':

    th = threading.Thread(target=run_flask)
    th.daemon = True
    th.start()    

    render_video()

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
