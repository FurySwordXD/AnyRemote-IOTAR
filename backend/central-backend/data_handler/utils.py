
from pathlib import Path

curr_dir = str(Path(__file__).parent.resolve())
print(curr_dir)

# from .data_handler import db
db = curr_dir + "/registered_devices.json"

import json
from pprint import pprint

def read_json():
    # Opening JSON file
    with open(db, 'r') as openfile:
    
        # Reading from json file
        json_object = json.load(openfile)
    
        # print(json_object)

    return json_object
        # print(type(json_object))

def write_json(data):
    
    with open(db, "w") as outfile:
       json.dump(data, outfile, indent = 4)


if __name__ == "__main__":

    # data = {
    #     "name":"ron"
    # }

    # write_json(data)
    pprint(read_json())