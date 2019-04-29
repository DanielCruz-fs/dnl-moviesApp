import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pair'
})
export class PairPipe implements PipeTransform {

  transform( arr: any[] ): any[] {
    let pair = arr.reduce((result, value, index, array) => {
      if ( index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []);
    //console.log(pair);
    return pair;
  }

}
