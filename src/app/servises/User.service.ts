import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../interfaces/user.interface";
import { AuthService } from "./Auth.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient, private authService: AuthService) { }

    saveUser(user: User) {
        this.http.post<User>('http://localhost:8080/api/profile/edituser', user)
            .subscribe({
                next: response => console.log('User saved', response),
                error: err => console.error('Error saving user', err)
            });
    }

    router: Router = inject(Router);



    getAllUsers() {
        return this.http.get<User[]>('http://localhost:8080/api/admin/getallusers');
    }

    deleteUser(id: number) {
        return this.http.delete('http://localhost:8080/api/admin/deleteuser/' + id);
    }

    getUserById(id: number) {
        return this.http.get<User>('http://localhost:8080/api/profile/getuser/' + id);
    }
    getUserByName(userName: string) {
        return this.http.get<User>('http://localhost:8080/api/profile/getuser/' + userName);
    }
}
