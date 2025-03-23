import { Component, inject } from '@angular/core';
import { AuthService } from '../../servises/Auth.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);

  get curentUser(): User | undefined {
    return this.authService.getUser();
  }

  get isAuth(): boolean {
    return this.authService.isLoggedIn();
  }

  logOut() {
    this.authService.logout();
    window.location.reload();
  }

  login() {
    this.router.navigate(['/login']);
  }

  profile() {
    this.router.navigate(['/profile']);
  }
}
