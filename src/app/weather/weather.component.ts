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
  weatherMainData = {};
  main = {};
  weather;
  res;
  humidity;
  t = {};
  date = [];
  final = [];
  id = [];
  errorData;
  iterator = [0, 1, 2, 3, 4];
  description = [];
  humidityArray = [];
  tempMinArray = [];
  tempMaxArray = [];
  arr = [];
  weatherReport = [];
  // tslint:disable-next-line:no-inferrable-types
  submitLoading: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  cloud: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  err: boolean = false;
  ngOnInit() {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });
    this.description = [];
    this.humidityArray = [];
    this.tempMinArray = [];
    this.tempMaxArray = [];
    this.arr = [];
  }

  sendToAPIXU(formValues) {
    this.submitLoading = true;
    this.err = false;
    console.log('submitLoading' + this.submitLoading);
    this.apiCallService.getJSON(formValues)
      .subscribe(data => {
        this.err = false;
        this.cloud = false;
        this.submitLoading = false;
        this.weatherData = data;
        this.response = this.weatherData;
        this.list = this.response['list'];
        for (const item of this.list) {
          this.weatherMainData = item;
          this.main = this.weatherMainData['main'];
          this.date.push(this.weatherMainData['dt_txt']);
          this.humidity = this.main['humidity'];
          this.humidityArray.push(this.humidity);
          this.tempMinArray.push(this.main['temp_min']);
          this.tempMaxArray.push(this.main['temp_max']);
          this.weather = this.weatherMainData['weather'];
          for (const response of this.weather) {
            this.res = response;
            this.id.push(this.res['id']);
            this.description.push(this.res['description']);
          }

        }
        for (let k = 0; k < this.iterator.length; k++) {
          const lg = {
            humidity: this.humidityArray[k],
            description: this.description[k],
            date: this.date[k]
          };
          this.arr.push(lg);
          if (this.description[k] === 'overcast clouds') {
            this.cloud = true;
          } else {
            this.cloud = false;
          }
        }

      },
        error => {
          this.err = true;
          this.errorData = 'Not a valid Country';
          this.submitLoading = false;
          console.log('error' + JSON.stringify(error));
        }
      );
  }


  clearData() {
    this.description = [];
    this.humidityArray = [];
    this.tempMinArray = [];
    this.tempMaxArray = [];
    this.arr = [];
    this.cloud = false;
    this.err = false;

  }
}
