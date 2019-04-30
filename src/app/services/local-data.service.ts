import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MovieDetails } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {
  moviesStorage: MovieDetails[] = [];

  constructor(private storage: Storage, private toastController: ToastController) { }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
  
  saveMovie(movie: MovieDetails) {
    let existence = false;
    let message: string;

    for (const m of this.moviesStorage) {
      if (m.id === movie.id) {
        existence = true;
        break;
      }
    }

    if (existence) {
      this.moviesStorage = this.moviesStorage.filter(m => m.id !== movie.id);
      message = 'Removed from favorite list';
    } else {
      this.moviesStorage.push(movie);
      message = 'Added to favorite list';
    }
    this.storage.set('movies', this.moviesStorage);
    this.presentToast(message);
    
  }
}
