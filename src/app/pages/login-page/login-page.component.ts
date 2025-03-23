import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../servises/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})

export class LoginPageComponent implements OnInit {
  register() {
    this.router.navigate(["/register"]);
  }


  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);

  form: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  ngOnInit(): void {

  }

  onSubmit(): void {
    const { username, password } = this.form.value;
    this.authService.login(username, password).subscribe({
      next: data => {
        this.authService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.authService.getUser().roles;
        this.router.navigate(["/profile"]);
      },
      error: err => {
        this.isLoginFailed = true;
      }
    });
  }
}