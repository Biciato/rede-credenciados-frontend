import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  id: string;
  loading = false;

  passwordForm = new FormGroup({
    email: new FormControl(null, { validators: Validators.required }),
    password: new FormControl(null, { validators: Validators.required }),
    password_confirmation: new FormControl(null, { validators: Validators.required }),
  });

  constructor(private loginService: LoginService, private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get('id');
  }

  onSubmit() {
    this.loading = true;
    if (this.passwordForm.value.password === this.passwordForm.value.password_confirmation) {
      this.loginService
        .resetPasswordViaForgetPassword(this.id, this.passwordForm.value.email,
        this.passwordForm.value.password).subscribe(
          () => {
            this.passwordForm.reset();
            this.loading = false;
            this.router.navigate([{ outlets: { update: ['update-message'] }}]);
          },
          () => {
            this.router.navigate([{ outlets: { error: ['error-message'] }}]);
            this.loading = false;
          }
        );
    } else {
      this.router.navigate([{ outlets: { error: ['error-message'] }}]);
      this.loading = false;
    }
  }

}
