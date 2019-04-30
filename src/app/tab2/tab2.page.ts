import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { MovieSearched } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from './../components/detail/detail.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  searchText = '';
  movieSuggestions: string[] = ['Spiderman', 'Avengers', 'Captain Marvel', 'Iron Man', 'Hulk'];
  moviesFound: MovieSearched[] = [];
  loadingStatus: boolean = false;
  
  constructor(private moviesService: MoviesService, private modalController: ModalController) { }

  ngOnInit() {}

  onSearch(event) {
    let valueSearch = event.detail.value;
    if (this.isEmptyOrSpaces(valueSearch)) {
      this.moviesFound = [];
      return;
    }
    this.loadingStatus = true;
    this.moviesService.getSearchedMovie(valueSearch).subscribe(data => {
      this.moviesFound = data.results;
      this.loadingStatus = false;
      console.log(data.results);
    })
  }
  // defensive validation against null or blank spaces
  isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
  }

  async presentModal(id: string) {
    const modal = await this.modalController.create({
      component: DetailComponent,
      componentProps: { movieId: id }
    });
    return await modal.present();
  }
}
