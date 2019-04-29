import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {
  @Input() latestMoviesPoster: Movie[] = [];
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
  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async presentModal(id: string) {
    const modal = await this.modalController.create({
      component: DetailComponent,
      componentProps: { movieId: id }
    });
    return await modal.present();
  }

}
