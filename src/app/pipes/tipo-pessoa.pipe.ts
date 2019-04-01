import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoPessoa'
})
export class TipoPessoaPipe implements PipeTransform {

  constructor() { }

  transform(string: string): string {
      const newStr = string.replace('pessoa_', '');
      return newStr.charAt(0).toUpperCase() + newStr.slice(1);
  }
}
