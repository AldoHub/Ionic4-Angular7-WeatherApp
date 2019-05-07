import { Component, OnInit} from '@angular/core';
import { WeatherService } from "../weather.service";
import {FormGroup, FormControl, Validators } from "@angular/forms";
//ionic storage
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss'],
})
export class ListPage implements OnInit {
  
  constructor(private weatherService: WeatherService, private ionicStorage: Storage) {
  
  }

  public weatherForm = new FormGroup({
    city: new FormControl('', Validators.required),
  });
  public weather;
  public city;

  search(formData: FormData){
    console.log(formData);
    this.ionicStorage.set("city", formData["city"]);
    
    this.weatherService.getWeatherFromApi(formData["city"]).subscribe( weather => {
      this.weather = weather;
      console.log(weather);
    })

  }


  getWeather(){
      this.ionicStorage.get("city").then( city => {
        if(city === null){
          this.weatherService.getWeatherFromApi("paris").subscribe( weather => {
            this.weather = weather;
            console.log(weather);
          })
        }else{
          this.weatherService.getWeatherFromApi(city).subscribe( weather => {
            this.weather = weather;
            console.log(weather);
          });
        }

      }).catch(err =>{
        console.log(err);
      })
   
  }

  ngOnInit() {
    this.getWeather();
  }
  
}
