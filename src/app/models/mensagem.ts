export interface Mensagem {
    id?: number;
    destinatario_id: number;
    remetente_id: number;
    titulo: string;
    mensagem: string;
    mensagem_lida: any;
    created_at: Date;
}
