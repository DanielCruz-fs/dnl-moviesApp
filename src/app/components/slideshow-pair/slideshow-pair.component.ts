import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-slideshow-pair',
  templateUrl: './slideshow-pair.component.html',
  styleUrls: ['./slideshow-pair.component.scss'],
})
export class SlideshowPairComponent implements OnInit {
  @Input() movies: Movie[] = [];
  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10,
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false
    // }
  };
  constructor() { }

  ngOnInit() {}

}
