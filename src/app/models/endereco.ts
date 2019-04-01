export interface Endereco {
    id?: number;
    pessoa_id?: number;
    cep: string;
    rua: string;
    numero: number;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
}
