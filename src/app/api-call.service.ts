import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
const days = 5;
@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

 url = 'https://api.openweathermap.org/data/2.5/forecast?q=';
 appid = 'a6aefadebaa005d1dd0584a868a957cb';
  constructor(private http: HttpClient) { }

  public getJSON(values): Observable<any> {
    const newUrl = this.url + values.location + '&cnt=' + days + '&appid=' + this.appid;
    return this.http.get(newUrl)
                    .pipe(map((res: any) => res));

}
}
