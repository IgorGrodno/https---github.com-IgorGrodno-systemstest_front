import { Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
       {
              path: '', component: LayoutComponent,
              children:
                     [
                            { path: 'login', component: LoginPageComponent },
                            { path: 'admin', component: AdminPageComponent },
                            { path: 'register', component: RegisterPageComponent },
                            { path: 'profile', component: ProfileComponent }
                     ]
       }
];     
