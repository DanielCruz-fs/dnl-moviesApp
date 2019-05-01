import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseMDB, MovieDetails, MovieCredits, MovieSearchedMDB, Genre } from '../interfaces/interfaces';

const URL = environment.url;
const apiKey = environment.apiKey;
@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private popularPage = 0;
  constructor(private http: HttpClient) { }

  private executeQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}`;
    //console.log(query);
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
    this.popularPage++
    let query = `/discover/movie?sort_by=popularity.desc&page=${this.popularPage}`;
    return this.executeQuery<ResponseMDB>(query);
  }

  getMovieDetails(movieId: string) {
    return this.executeQuery<MovieDetails>(`/movie/${movieId}?x=0`);
  }

  getMovieCredits(movieId: string) {
    return this.executeQuery<MovieCredits>(`/movie/${movieId}/credits?x=0`);
  }

  getSearchedMovie(movie: string) {
    return this.executeQuery<MovieSearchedMDB>(`/search/movie?query=${movie}`);
  }

  getGenres() {
    return this.executeQuery<Genre>('/genre/movie/list?x=0');
  }
}
