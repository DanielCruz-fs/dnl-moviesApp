import { Component } from '@angular/core';
import { LocalDataService } from '../services/local-data.service';
import { MovieDetails, Genre, Movie } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{
  favMovies: MovieDetails[] =[];
  genres: Genre[] = [];
  filterFavMovies: { genre: string, movies: MovieDetails[] }[];
  constructor(private localDataService: LocalDataService, private moviesService: MoviesService) { }

  /**this script makes tab3 work in real time (kind of) only in ionic instead of ngOnInit */
  /**when using pages or components ngOnInit would be fine */
  async ionViewWillEnter() {
    this.favMovies = await this.localDataService.loadMoviesFromStorage();
    this.moviesService.getGenres().subscribe((data: any) => {
      this.genres = data.genres;
      console.log(data);
      this.filterMoviesByGenre(this.genres, this.favMovies);
    });
  }



  private filterMoviesByGenre(genres: Genre[], movies: MovieDetails[]) {
    this.filterFavMovies = [];
    
    genres.forEach(g => {
      this.filterFavMovies.push({
        genre: g.name,
        movies: movies.filter(m => {
          return m.genres.find( mGenre => mGenre.id === g.id);
        })
      });
    });

    console.log('filtered fav movies', this.filterFavMovies);
  }
}
