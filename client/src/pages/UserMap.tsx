import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

import { baiduCRS } from '../lib/leaflet';

import { selectRawTouristList } from '../store/tourist/touristSlice';
import { useSelector } from 'react-redux';

import { useVisit } from '../context/visit';
import ITouristItem from '../types/ITouristItem';

export default function UserMap() {
  const rawTouristList: ITouristItem[] = useSelector(selectRawTouristList);
  const { exist } = useVisit()!;
  const visitedList = rawTouristList!.filter((item) => exist(item.name));
  const markers = visitedList.map((item) => {
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
