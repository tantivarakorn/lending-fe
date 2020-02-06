import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comma'
})
export class CommaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  }
}
