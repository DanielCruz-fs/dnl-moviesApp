import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { MovieDetails, Cast } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';

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

  constructor(private moviesService: MoviesService, private modalController: ModalController) { }

  ngOnInit() {
    this.moviesService.getMovieDetails(this.movieId).subscribe(data => {
      //console.log(data);
      this.movie = data;
    });
    this.moviesService.getMovieCredits(this.movieId).subscribe(data => this.cast = data.cast);
  }

  closeModal(){
    this.modalController.dismiss();
  }

}
