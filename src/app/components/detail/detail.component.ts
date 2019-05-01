import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { MovieDetails, Cast } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() movieId;
  movie: MovieDetails = { };
  hideText = 200;
  cast: Cast[] = [];
  starIcon = 'star-outline';
  slideOpts = {
    //initialSlide: 0,
    //speed: 200,
    slidesPerView: 3.3,
    freeMode: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }
  };

  constructor(private moviesService: MoviesService, private modalController: ModalController,
              private localDataService: LocalDataService) { }

  ngOnInit() {
    this.localDataService.existenceMovie(this.movieId).then(resp => {
      resp ? this.starIcon = 'star' : this.starIcon = 'star-outline';
      console.log('movie existence',resp);
    });
    

    this.moviesService.getMovieDetails(this.movieId).subscribe(data => this.movie = data);
    this.moviesService.getMovieCredits(this.movieId).subscribe(data => this.cast = data.cast);
  }

  closeModal(){
    this.modalController.dismiss();
  }

  addMovieToStorage() {
    let iconStatusSwitch = this.localDataService.saveMovie(this.movie);
    iconStatusSwitch ? this.starIcon = 'star' : this.starIcon = 'star-outline';
    // console.log(iconStatusSwitch);
  }

}
