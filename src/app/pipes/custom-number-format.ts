import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyformat'
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number): string {
    let formattedString: string;
    formattedString = value.toFixed(2);
    formattedString = formattedString.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    formattedString = formattedString.replace(/.([^.]*)$/,',$1');


    return formattedString;
  }

}
