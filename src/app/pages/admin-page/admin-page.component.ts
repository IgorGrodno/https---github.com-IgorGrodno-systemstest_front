import { Component, inject } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../servises/Auth.service";
import { User } from "../../interfaces/user.interface";
import { UserService } from "../../servises/User.service";


@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent {
  users: User[] = [];

  ngOnInit(): void {
    this.getAllUsers();
  }

  userService: UserService = inject(UserService);

  getAllUsers() {
    this.userService.getAllUsers()
      .subscribe({
        next: data => {
          this.users = data;
        }
      });;
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id)
      .subscribe(res => { window.location.reload(); });
  }
}
