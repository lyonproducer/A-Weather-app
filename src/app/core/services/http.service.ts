import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URI } from 'src/app/shared/constants/uri';
import { ICurrent } from 'src/app/shared/interfaces/current';
import { ICityResult } from 'src/app/shared/interfaces/searchResult';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { 
  }


  getCurrent(paramsQuery?: string) {
    let params = new HttpParams();
    if(paramsQuery) {
      params = params.append('q', paramsQuery);
    }
    params = params.append('key', environment.apiKey);
    const url = `${environment.apiUrl}${URI.GET_CURRENT_DATA}`;
    return this.http.get<ICurrent>(url, {params});
  }

  getSearch(paramsQuery?: string) {
    let params = new HttpParams();
    if(paramsQuery) {
      params = params.append('q', paramsQuery);
    }
    params = params.append('key', environment.apiKey);
    const url = `${environment.apiUrl}${URI.GET_SEARCH_DATA}`;
    return this.http.get<ICityResult[]>(url, {params});
  }

}