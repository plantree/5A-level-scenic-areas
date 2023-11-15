#!/usr/bin/python3
"""
Get data from the official site of Ministry of Culture and Tourism of the People's Republic of China.
Reference: https://www.mct.gov.cn/tourism/#/list
"""
import requests
import json

from geocode import get_geocode

tourist_url = 'https://www.mct.gov.cn/tourism/api/content/getContentListByDirId'

headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 \
        (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
}

def get_list(url=tourist_url):
    """
    Get the list of the scenic areas.
    """
    data = {"directoryId":"4","page":1,"size":500,"searchList":[]}
    r = requests.post(url, json=data, headers=headers)
    try:
        dicts = []
        resp = r.json()
        contents = resp['data']['contentList']['content']
        for item in contents:
            dicts.append({
                'name': item['name'],
                'province': item['provinceName'],
                'year': item['year'],
                'location': get_geocode(item['name'])
            })
            print('get', item['name'])
        return dicts
    except Exception:
        print('An exception occurred.')
        return
    

if __name__ == '__main__':
    print(json.dumps(get_list()))

