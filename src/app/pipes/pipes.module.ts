import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from './image.pipe';
import { PairPipe } from './pair.pipe';

@NgModule({
  declarations: [ImagePipe, PairPipe],
  imports: [
    CommonModule
  ],
  exports: [
    ImagePipe,
    PairPipe
  ]
})
export class PipesModule { }
