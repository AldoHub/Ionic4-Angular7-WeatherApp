import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) {}

  getWeatherFromApi(city: string){
    return this.httpClient.get(`https://api.apixu.com/v1/current.json?key=YOUR_APIXU_KEY=${city}`);
  }
}
