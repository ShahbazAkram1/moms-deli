import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Country } from '../common/country';
import { map } from 'rxjs/operators';
import { State } from '../common/state';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MomsDeliFormService {

  private countriesUrl = 'https://api.momsdelionline.com/api/countries';
  private statesUrl = 'https://api.momsdelionline.com/api/states';

  // private countriesUrl = 'http://momsdelionline.com:8080/api/countries';
  // private statesUrl = 'http://momsdelionline.com:8080/api/states';

  // private countriesUrl = 'http://3.83.92.87:8080/api/countries';
  // // // private statesUrl = 'http://3.83.92.87:8080/api/states';
  // private countriesUrl = 'http://localhost:8080/api/countries';
  // private statesUrl = 'http://localhost:8080/api/states';

  //private countriesUrl = 'http://momsdeli.us-east-1.elasticbeanstalk.com/api/countries';
  // private statesUrl = 'http://momsdeli.us-east-1.elasticbeanstalk.com/api/states';

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {

    return this.httpClient.get<GetResponseCountries>(`${environment.BASE_URL}countries`).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(theCountryCode: string): Observable<State[]> {

    // search url
    const searchStatesUrl = `${environment.BASE_URL}states/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }


  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];
    
    // build an array for "Month" dropdown list
    // - start at current month and loop until 

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {

    let data: number[] = [];

    // build an array for "Year" downlist list
    // - start at current year and loop for next 10 years
    
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }

}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}