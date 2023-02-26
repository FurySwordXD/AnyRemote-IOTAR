

from pprint import pprint
from .utils import *


class DBHandler():

    def __init__(self):
        self.id_counter = 5
        

    def get_devices(self):
        data = read_json()
        return data

    def add_device(self,new_device_data):

        data = read_json()

        data["devices"].append(
            {
                "id": str(self.id_counter),
                "device_info": new_device_data
            }
        )
        self.id_counter+=1

        write_json(data)

        return

    def update_device(self,device_data):

        data =  read_json()

        for dat in data["devices"]:
            if dat["id"] == device_data["id"]:
                dat["device_info"] = device_data["device_info"]

        write_json(data)


    def delete_device(self,device_data):

        data =  read_json()
        
        for dat in data["devices"]:
            if dat["id"] == device_data["id"]:
                idx = data["devices"].index(dat)
                del data["devices"][idx]

        write_json(data)

    def compare_device(self,device_type, rssi):
        data = read_json()

        print(rssi)

        potential = []

        for dat in data["devices"]:
            if dat["device_info"]["device_type"] == device_type:
                potential.append(dat)

        print("potential : ", potential)
        
        if(len(potential)==0):
            return None
        
        elif(len(potential)==1):
            return potential[0]

        else:
            if(abs(potential[0]["device_info"]["device_fingerprint"]["rssi"]-rssi)>abs(potential[1]["device_info"]["device_fingerprint"]["rssi"]-rssi)):
                return potential[1]
            else:
                return potential[0
                
                
                
                ]

    # def get_device_status_byid(self,device_id):

    #     data = read_json()

    #     for dat in data["devices"]:
    #         if


            
    

        



if __name__ == "__main__":

    new_data = {
                    "device_type": "smart_display",
                    "device_name": "random_tv",
                    "device_fingerprint":{
                        "rssi":11,
                        "image_embed": "random"
                    }
                }

    deletable_data = {
        "id": "5",
        "device_info":new_data
    }
        
    dbh = DBHandler()

    pprint(dbh.get_devices())

    dbh.delete_device(deletable_data)
    print("\nnew data\n")
    pprint(dbh.get_devices())

    dbh.add_device(new_data)
    print("\nnew data\n")
    pprint(dbh.get_devices())

    