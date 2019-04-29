import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-slideshow-pair',
  templateUrl: './slideshow-pair.component.html',
  styleUrls: ['./slideshow-pair.component.scss'],
})
export class SlideshowPairComponent implements OnInit {
  @Input() movies: Movie[] = [];
  @Output() loadMore = new EventEmitter();
  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10,
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false
    // }
  };
  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  onLoadMoreMovies() {
    this.loadMore.emit();
  }

  async presentModal(id: string) {
    const modal = await this.modalController.create({
      component: DetailComponent,
      componentProps: { movieId: id }
    });
    return await modal.present();
  }

}
