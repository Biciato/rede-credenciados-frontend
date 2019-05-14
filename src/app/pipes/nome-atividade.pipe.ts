import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nomeAtividade'
})
export class NomeAtividadePipe implements PipeTransform {

  constructor() { }

  transform(string: string): string {
    const newString = string.replace(/,/, ' | ');

    return newString;
  }
}
