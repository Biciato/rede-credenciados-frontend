export interface User {
  id?: number;
  name: string;
  email: string;
  tipo_pessoa: string;
  password: string;
  password_confirmation: string;
  admin?: boolean;
}
