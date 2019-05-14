import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ModalService } from '../services/modal/modal.service';
import { NewsletterService } from '../services/newsletter/newsletter.service';

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.scss']
})

export class FooterComponent {
  // initiating newsletter form
  newsForm = new FormGroup({
    nome: new FormControl(null),
    email: new FormControl(null, { validators: [Validators.email, Validators.required],
      updateOn: 'blur'})
  });
  links: string[];
  loading = false;

  constructor(private newService: NewsletterService, private modalService: ModalService, private router: Router) {
    this.links = [
      'Principal',
      'Quem Somos',
      'Cadastre-se grátis',
      'Solicitar cotações',
      // 'Currículos',
      'Anúncios',
      'Contato'
    ];
  }

  closeModal(id) {
    this.modalService.close(id);
  }

  linkRoutes(linkName) {
    switch (linkName) {
      case 'Principal': {
        this.router.navigate(['/']);
        break;
      }
      case 'Quem Somos': {
        this.router.navigate(['/quem-somos']);
        break;
      }
      case 'Cadastre-se grátis': {
        this.router.navigate(['/register']);
        break;
      }
      case 'Solicitar cotações': {
        this.modalService.open('modal-cotacao');
        break;
      }
      case 'Currículos': {
        this.router.navigate(['/curriculum']);
        break;
      }
      case 'Anúncios': {
        this.router.navigate(['/anuncios']);
        break;
      }
      case 'Contato': {
        this.router.navigate(['/contato']);
        break;
      }
      default: {
        this.router.navigate(['/']);
        break;
      }
    }
  }

  // Sends newsletter data to server
  newNewsletter() {
    if (this.newsForm.valid) {
      this.loading = true;
      this.newService.create(this.newsForm.value)
        .subscribe(
          () => {
            this.newsForm.reset();
            this.router.navigate([{ outlets: { newsletter: ['newsletter-message'] }}]);
            this.loading = false;
          },
          () => {
            this.router.navigate([{ outlets: { error: ['error-message'] }}]);
            this.loading = false;
          }
        );
    } else {
      this.openModal('modal-validator-news');
    }
  }

  openModal(id) {
    this.modalService.open(id);
  }
}
