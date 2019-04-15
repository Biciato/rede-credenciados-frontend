import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessageComponent } from './modal-messages/message/message.component';
import { SectionComponent } from './section/section.component';
import { InformacoesComponent } from './informacoes/informacoes.component';
import { NewsletterMessageComponent } from './modal-messages/newsletter-message/newsletter-message.component';
import { PageNotFoundComponent } from './not-founding.component';
import { RegisterComponent } from './register/register.component';
import { RegisterPropagandaComponent } from './modal-messages/register-propaganda/register-propaganda.component';
import { RegisterSuccessComponent } from './modal-messages/register-success/register-success.component';
import { RegisterUnidadeComponent } from './modal-messages/register-unidade/register-unidade.component';
import { SolicitationMessageComponent } from './modal-messages/solicitation/solicitation-message.component';
import { UpdateMessageComponent } from './modal-messages/update-message/update-message.component';
import { AboutComponent } from './about/about.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { ContatoComponent } from './contato/contato.component';
import { AnunciosComponent } from './anuncios/anuncios.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ArquivoUploadComponent } from './modal-messages/arquivo-success/arquivo-success.component';
import { ForgetPasswordEmailComponent } from './forget-password-email/forget-password-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ErrorMessageComponent } from './modal-messages/error-message/error-message.component';
import { PasswordConfirmationErrorComponent } from './modal-messages/password-confirmation/password-confirmation-error.component';
import { EmailVerifiedComponent } from './modal-messages/email-verified/email-verified.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: SectionComponent },
  { path: 'informacoes', component: InformacoesComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'quem-somos', component: AboutComponent },
  { path: 'curriculum', component: CurriculumComponent },
  { path: 'anuncios', component: AnunciosComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'email-confirmation', component: EmailConfirmationComponent },
  { path: 'forget-password-email', component: ForgetPasswordEmailComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'compose', component: MessageComponent, outlet: 'popup'},
  { path: 'solicitation-message', component: SolicitationMessageComponent, outlet: 'message'},
  { path: 'register-message', component: RegisterSuccessComponent, outlet: 'success'},
  { path: 'update-message', component: UpdateMessageComponent, outlet: 'update' },
  { path: 'register-unidade', component: RegisterUnidadeComponent, outlet: 'unidade' },
  { path: 'register-propaganda', component: RegisterPropagandaComponent, outlet: 'propaganda' },
  { path: 'newsletter-message', component: NewsletterMessageComponent, outlet: 'newsletter' },
  { path: 'arquivo-upload', component: ArquivoUploadComponent, outlet: 'arquivo' },
  { path: 'error-message', component: ErrorMessageComponent, outlet: 'error' },
  { path: 'password-error', component: PasswordConfirmationErrorComponent, outlet: 'password' },
  { path: 'email-verified', component: EmailVerifiedComponent, outlet: 'verified' },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
