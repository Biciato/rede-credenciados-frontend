import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { RegisterService } from '../services/register/register.service';
import { ModalService } from '../services/modal/modal.service';

@Component({
    selector: 'app-email-confirmation',
    template: `
        <section>
            <h2>{{msgHeader}}</h2>
            <p>{{msgParagraph}}</p>
            <button class="rd-button-dash" (click)="openModal()" *ngIf="errFlag">Minha Conta</button>
        </section>
        <div class="my-container">
            <ng-template #customLoadingTemplate>
                <div class="custom-class">
                </div>
            </ng-template>

            <ngx-loading [show]="loading" [config]="{ backdropBorderRadius: '3px', fullScreenBackdrop: true }"
                [template]="customLoadingTemplate"></ngx-loading>
        </div>
    `,
    styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {
    loading = false;
    msgHeader: string;
    msgParagraph: string;
    errFlag = true;

    constructor(private route: ActivatedRoute, private modalService: ModalService,
                private registerService: RegisterService) { }

    ngOnInit() {
        this.loading = true;
        this.registerService.confirmEmail(this.route.snapshot.queryParamMap.get('id'))
            .subscribe(
                () => {
                    this.msgHeader = 'Parabéns, o seu cadastro no Rede Credenciados foi iniciado';
                    this.msgParagraph = `Por favor, logue no sistema para completar o cadastro.
                    Assim, as empresas terão mais facilidade para te encontrar
                    e entrar em contato !!!`;
                    this.loading = false;
                },
                () => {
                    this.msgParagraph = 'Não foi possível confirmar o e-mail. Favor contactar o administrador do Rede Credenciados';
                    this.msgHeader = 'Que pena, algo deu errado';
                    this.loading = false;
                    this.errFlag = false;
                }
            );
    }

    openModal() {
        this.modalService.open('modal-login');
    }

}
