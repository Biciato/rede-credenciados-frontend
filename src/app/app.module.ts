import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardAdminModule } from './dashboard-admin/dashboard-admin.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SectionModule } from './section/section.module';
import { SharedModule } from './shared-module/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EmailVerifiedComponent } from './modal-messages/email-verified/email-verified.component';
import { ErrorMessageComponent } from './modal-messages/error-message/error-message.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { InformacoesComponent } from './informacoes/informacoes.component';
import { NewsletterMessageComponent } from './modal-messages/newsletter-message/newsletter-message.component';
import { PageNotFoundComponent } from './not-founding.component';
import { PasswordConfirmationErrorComponent } from './modal-messages/password-confirmation/password-confirmation-error.component';
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

@NgModule({
  declarations: [
    AppComponent,
    EmailVerifiedComponent,
    ErrorMessageComponent,
    FooterComponent,
    HeaderComponent,
    InformacoesComponent,
    NewsletterMessageComponent,
    RegisterComponent,
    RegisterPropagandaComponent,
    RegisterSuccessComponent,
    RegisterUnidadeComponent,
    PageNotFoundComponent,
    PasswordConfirmationErrorComponent,
    SolicitationMessageComponent,
    UpdateMessageComponent,
    AboutComponent,
    CurriculumComponent,
    ContatoComponent,
    AnunciosComponent,
    EmailConfirmationComponent,
    ArquivoUploadComponent,
    ForgetPasswordEmailComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    DashboardAdminModule,
    FormsModule,
    ReactiveFormsModule,
    SectionModule,
    SharedModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
