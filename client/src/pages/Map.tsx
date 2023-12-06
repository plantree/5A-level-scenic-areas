import { useSelector } from 'react-redux';
import { selectTouristList } from '../store/tourist/touristSlice';

import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import { bounds, Proj } from 'leaflet';
import 'proj4leaflet';

// Reference:
// 1. https://github.com/neoayi/leaflet-tileLayer-baidu/blob/master/src/tileLayer.baidu.js
// 2. https://codesandbox.io/p/sandbox/react-leaflet-baidu-maps-dyfi0j?file=%2Fsrc%2FApp.tsx%3A60%2C10-65%2C14
const baiduCRS = new Proj.CRS(
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

export default function Map() {
  const touristList = useSelector(selectTouristList);
  const markers = touristList.map((item) => {
    const { name, province, year, location } = item;
    return (
      <Marker position={[location.lat, location.lng]} key={name}>
        <Popup>
          {name}
          <br />
          {province}/{year}
        </Popup>
      </Marker>
    );
  });

  return (
    <main className="flex-grow h-48">
      <MapContainer
        crs={baiduCRS}
        center={[35.55492, 104.71123]}
        zoom={5}
        minZoom={4}
        className="w-full h-full z-0"
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="地图">
            <TileLayer
              attribution='&copy; <a href="https://map.baidu.com/zt/client/">Baidu Map</a> contributors'
              url="https://maponline{s}.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl"
              subdomains={['0', '1', '2', '3']}
              maxNativeZoom={18}
              minNativeZoom={3}
              tms={true}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="卫星">
            <TileLayer
              attribution='&copy; <a href="https://map.baidu.com/zt/client/">Baidu Map</a> contributors'
              url="http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46"
              subdomains={['0', '1', '2', '3']}
              maxNativeZoom={18}
              minNativeZoom={3}
              tms={true}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        {markers}
      </MapContainer>
    </main>
  );
}
