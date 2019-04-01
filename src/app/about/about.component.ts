import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-about',
    template: `
        <section>
            <img src="../../assets/images/detalhe-home-direita.jpg" alt="Medicos">
            <div>
                <h1 style="text-align: center">Quem Somos !!!</h1>
                <p>
                    <b>Somos</b> uma empresa especializada no credenciamento de profissionais das áreas de Medicina e Segurança do Trabalho.
                    Nosso foco é totalmente voltado para essa área.
                </p>
                <p>
                    <b>O principal objetivo</b> do Portal Rede Credenciados é facilitar e melhorar
                    o relacionamento entre nossos credenciados e seus clientes, proporcionando uma enorme variedade de profissionais e
                    serviços para a sua livre escolha em todo o território nacional. Com isso disponibilizamos uma ampla variedade de
                    profissionais que disponibilizam produtos e serviços, diferenciados para os usuários do portal Rede Credenciados.
                </p>
                <p>
                    <b>Nosso interesse</b> é criar um ambiente de negócios de amplitude nacional, para que possa haver uma concorrência
                    justa entre as empresas e profissionais do setor, e que o maior beneficiado seja sempre o cliente que busca
                    profissionais e empresas de qualidade.
                </p>
            </div>
        </section>
    `,
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
