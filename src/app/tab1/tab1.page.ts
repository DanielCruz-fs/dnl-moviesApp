import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  latestMovies: Movie[] = []; 
  popularMovies: Movie[] = [];
  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.moviesService.getLatestMovies().subscribe(data => {
      //console.log(data);
      this.latestMovies = data.results;
    });

    this.moviesService.getPopularMovies().subscribe(data => {
      console.log('popular-movies', data);
      this.popularMovies = data.results;
    });
  }
}
