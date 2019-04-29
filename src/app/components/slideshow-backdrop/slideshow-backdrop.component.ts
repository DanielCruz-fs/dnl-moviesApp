import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() latestMovies: Movie[] = [];
  slideOpts = {
    initialSlide: 0,
    speed: 1000, // time in ms estimated when user interacts with the slide-show
    autoplay: {
      delay: 5000, // time in ms estimated for autoplay
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
