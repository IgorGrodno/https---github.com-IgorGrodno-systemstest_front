import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../servises/Auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  form: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(40)]),
    adminrole: new FormControl(false)
  });

  authService: AuthService = inject(AuthService);
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.register(
        this.form.get('username')?.value,
        this.form.get('password')?.value,
        this.form.get('email')?.value,
        ['user']
      ).subscribe({
        next: data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          window.location.reload();
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });
    } else {
      alert('Пожалуйста, заполните форму корректно');
    }
  }


  get username() { return this.form.get('username'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get adminrole() { return this.form.get('adminrole'); }
}
