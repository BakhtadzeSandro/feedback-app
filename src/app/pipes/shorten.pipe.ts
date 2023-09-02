import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value: string | undefined, maxLength: number = 50): string {
    if (value) {
      if (value.length <= maxLength) {
        return value;
      } else {
        return value.substr(0, maxLength) + '...';
      }
    } else {
      return '';
    }
  }
}
