import { environment } from './../../environments/environment';
import { Pipe, PipeTransform } from '@angular/core';

const imageUrMDB = environment.imgPath;
@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(imageUrl: string, size: string = 'w500'): string {
    if (!imageUrl)
      return './assets/no-image-banner.jpg'
    let fullImgUrl = `${imageUrMDB}/${size}${imageUrl}`;
    //console.log(fullImgUrl);    
    
    return fullImgUrl;
  }

}
