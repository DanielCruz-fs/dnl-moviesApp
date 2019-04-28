import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseMDB } from '../interfaces/interfaces';

const URL = environment.url;
const apiKey = environment.apiKey;
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  private executeQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}`;
    return this.http.get<T>(query);
  }
  getLatestMovies() {
    //calculating the date's range
    let today = new Date();
    let lastDay = new Date( today.getFullYear(), today.getMonth() + 1, 0 ).getDate();
    let month = today.getMonth() + 1;

    let monthString;
    (month < 10) ? monthString = `0${month}` : monthString = month;

    let dateBegin = `${today.getFullYear()}-${monthString}-01`;
    let dateEnd = `${today.getFullYear()}-${monthString}-${lastDay}`;

    return this.executeQuery<ResponseMDB>(`/discover/movie?primary_release_date.gte=${dateBegin}&primary_release_date.lte=${dateEnd}`); 
  }

  getPopularMovies() {
    let query = '/discover/movie?sort_by=popularity.desc';
    return this.executeQuery<ResponseMDB>(query);
  }
}
