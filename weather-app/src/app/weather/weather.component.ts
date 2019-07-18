import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiCallService } from '../api-call.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  public weatherSearchForm: FormGroup;
  public weatherData: any;


  constructor(private formBuilder: FormBuilder, private apiCallService: ApiCallService) { }
  list = [];
  response = {};
  weat = {};
  main = {};
  weather;
  res;
  humidity;
  t = {};
  date = [];
  final = [];
  id = [];
  iterator = [0, 1, 2, 3, 4];
  description = [];
  humidityArray = [];
  tempMinArray = [];
  tempMaxArray = [];
  arr = [];
  weatherReport = [];
  ngOnInit() {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });
    this.description = [];
  this.humidityArray = [];
  this.tempMinArray = [];
  this.tempMaxArray = [];
  this.t = [];
  this.arr = [];
  this.final = [];
  this.weatherReport[0] = { humidity: '', tempMin: '', tempMax: '', description: ''};
  }

  sendToAPIXU(formValues) {
    console.log(formValues);
    this.apiCallService.getJSON(formValues)
      .subscribe(data => {
        console.log(data);
        this.weatherData = data;
        this.response = this.weatherData;
        this.list = this.response['list'];
        console.log('list ' + JSON.stringify(this.list));


        for (const ee of this.list) {
          this.weat = ee;
          this.main = this.weat['main'];
          this.date.push(this.weat['dt_txt']);
          console.log('date' + JSON.stringify(this.date));
          this.humidity = this.main['humidity'];
          this.humidityArray.push(this.humidity);
          this.tempMinArray.push(this.main['temp_min']);
          this.tempMaxArray.push(this.main['temp_max']);
          this.weather = this.weat['weather'];
          for (const response of this.weather) {
            this.res = response;
            this.id.push(this.res['id']);
            this.description.push(this.res['description']);
          }

        }
        console.log('date' + JSON.stringify(this.date));
        for ( let k = 0; k < this.iterator.length ; k++) {
          const lg = {
            humidity : this.humidityArray[k],
            description: this.description[k],
            date: this.date[k]
          };
          this.arr.push(lg);
         }
        console.log('t' + JSON.stringify(this.arr));
        console.log('humidityArray' + JSON.stringify(this.humidityArray));
        console.log('tempMinArray' + JSON.stringify(this.tempMinArray));
        console.log('tempMinArray' + JSON.stringify(this.tempMinArray));
        console.log('id' + JSON.stringify(this.id));
        console.log('description' + JSON.stringify(this.description));

      });
  }
}



