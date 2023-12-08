interface Location {
  lat: number;
  lng: number;
}

export default interface ITouristItem {
  id: number;
  name: string;
  province: string;
  year: string;
  location: Location;
}
