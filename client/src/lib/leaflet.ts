import 'leaflet/dist/leaflet.css';
// @ts-ignore
import { bounds, Proj } from 'leaflet';

import 'proj4leaflet';

// Reference:
// 1. https://github.com/neoayi/leaflet-tileLayer-baidu/blob/master/src/tileLayer.baidu.js
// 2. https://codesandbox.io/p/sandbox/react-leaflet-baidu-maps-dyfi0j?file=%2Fsrc%2FApp.tsx%3A60%2C10-65%2C14
export const baiduCRS = new Proj.CRS(
  'EPSG:900913',
  '+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
  {
    resolutions: (function () {
      const level = 19;
      const res = [];
      res[0] = Math.pow(2, 18);
      for (let i = 1; i < level; i++) {
        res[i] = Math.pow(2, 18 - i);
      }
      return res;
    })(),
    origin: [0, 0],
    bounds: bounds([20037508.342789244, 0], [0, 20037508.342789244])
  }
);
