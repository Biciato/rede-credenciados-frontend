import { AbstractControl, ValidatorFn } from '@angular/forms';

export function stateValidator(): ValidatorFn {
    const brStatesSigla = [
        'RJ',
        'RO',
        'AC',
        'AM',
        'RR',
        'PA',
        'TO',
        'AP',
        'MA',
        'PI',
        'CE',
        'RN',
        'PB',
        'PE',
        'AL',
        'SE',
        'BA',
        'MG',
        'ES',
        'SP',
        'PR',
        'SC',
        'RS',
        'MS',
        'GO',
        'MT',
        'DF'
    ];
    const brStatesName = [
        'Rio de Janeiro',
        'Rondonia',
        'Acre',
        'Amazonas',
        'Roraima',
        'Para',
        'Tocantins',
        'Amapa',
        'Maranhao',
        'Piaui',
        'Ceara',
        'Rio Grande do Norte',
        'Paraiba',
        'Pernambuco',
        'Alagoas',
        'Sergipe',
        'Bahia',
        'Minas Gerais',
        'Espirito Santo',
        'Sao Paulo',
        'Parana',
        'Santa Catarina',
        'Rio Grande do Sul',
        'Mato Grosso do Sul',
        'Goias',
        'Mato Grosso',
        'Distrito Federal'
    ];
    return (control: AbstractControl): {[key: string]: any} | null => {

        return brStatesSigla.includes(control.value) ||
            brStatesName.includes(control.value) ? null : {'stateInvalid': true};
    };
}
