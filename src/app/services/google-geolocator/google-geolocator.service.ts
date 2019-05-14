import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class GoogleGeolocatorService {

  key = 'AIzaSyAsQa1YZbfjOTbZx1OoEIHG_pCN965nhGk';

  urllatLng = 'https://www.googleapis.com/';

  urlGeocode = 'https://maps.googleapis.com/maps/api/geocode/json?';

  options = '&location_type=ROOFTOP&result_type=street_address&key=';

  constructor(private http: HttpClient) { }

  locationLatLong() {
    return this.http.post( this.urllatLng + 'geolocation/v1/geolocate?key=' + this.key, {});
  }

  cidade(data) {
    return this.http.get<any>(this.urlGeocode + 'latlng=' + data.location.lat + ',' + data.location.lng + this.options + this.key);
  }

  getLatLng(numero, rua, bairro, cidade) {
    const options = numero + '+' + rua + '+' + bairro + ',+' + cidade + '+View,+BR&key=';
    return this.http.get<any>(this.urlGeocode + 'address=' + options + this.key);
  }
}
