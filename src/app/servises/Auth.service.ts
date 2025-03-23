import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, take } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { throwError } from 'rxjs';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  private authStatus = new BehaviorSubject<boolean>(false); // Инициализируем false
  authStatus$ = this.authStatus.asObservable();


  constructor(private http: HttpClient, private cookieService: CookieService, private ngZone: NgZone) {
    this.authStatus.next(this.isLoggedIn());  // Теперь вызываем isLoggedIn() после инициализации
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signin`, { username, password }).pipe(
      tap(response => {
        if (response.token) {
          this.cookieService.set('jwt', response.token, { path: '/', secure: true }); // Добавили secure
          this.saveUser(response.user);
          this.ngZone.run(() => { // 🔥 Принудительно обновляем в зоне Angular
            this.authStatus.next(true);
          });
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error('Ошибка авторизации'));
      })
    );
  }

  register(username: string, password: string, email: string, role: string[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/newuserregister`, { username, password, email, role }).pipe(
      catchError(error => {
        console.error('Registration error:', error);
        return throwError(() => new Error('Ошибка регистрации'));
      })
    );
  }

  logout(): void {
    this.http.get(`${this.apiUrl}/signout`, { withCredentials: true }).subscribe({
      next: () => {
        this.clearAuthData();
      },
      error: (err) => {
        console.error('Logout error:', err);
        this.clearAuthData(); // 🔥 Даже при ошибке чистим данные
      }
    });
  }

  private clearAuthData(): void {
    this.cookieService.delete('jwt', '/'); // 🔥 Гарантированное удаление токена
    window.sessionStorage.removeItem(USER_KEY); // 🔥 Удаляем данные пользователя
    this.authStatus.next(false); // 🔥 Уведомляем подписчиков, что пользователь вышел
  }

  public saveUser(user: any): void {
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private clearUserData(): void {
    window.sessionStorage.removeItem(USER_KEY);
    this.authStatus.next(false);
  }

  getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    const loggedIn = !!this.cookieService.get('jwt') || this.getUser() !== null;
    this.authStatus.next(loggedIn); // 🔥 Добавляем обновление состояния
    return loggedIn;
  }
}
