export interface Credenciado {
  id: number;
  situacao: string;
  tipo_pessoa: string;
  razao_social?: string;
  nome?: string;
  nome_fantasia?: string;
  cidade: string;
  tel1?: string;
  tel2?: string;
  cel?: string;
  email: string;
}
