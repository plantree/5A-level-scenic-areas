interface Location {
  lat: number;
  lng: number;
}

export default interface ITouristItem {
  name: string;
  province: string;
  year: string;
  location: Location;
}
