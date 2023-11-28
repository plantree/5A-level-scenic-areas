#!/usr/bin/python3
"""
Turn the name of the scenic areas into the coordinates.
"""
import requests

url = 'https://api.map.baidu.com/geocoding/v3'
ak = '9AjVGGbCNv7NyPVQ3sYVcFGzuFjKahLT'

def get_geocode(address):
    """
    Get the coordinates of the address.
    """
    if address == '新疆生产建设兵团第十师白沙湖景区':
        address = '白沙湖景区'
    params = {
        'address': address,
        'output': 'json',
        'ak': ak
    }
    r = requests.get(url, params=params)
    try:
        resp = r.json()
        if resp['status'] == 0:
            return resp['result']['location']
        else:
            return None
    except Exception as e:
        print('An exception occurred. e:', e)
        return None


    
if __name__ == '__main__':
    print(get_geocode('故宫博物院'))