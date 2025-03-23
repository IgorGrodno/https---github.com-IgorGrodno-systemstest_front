import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../servises/User.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servises/Auth.service';
import { MealComponentComponent } from "./meal-component/meal-component.component";
import { DisheService } from '../../servises/Dishe.service';
import { Dish } from '../../interfaces/dish.interface';
import { TodayMeal } from '../../interfaces/todayMeal.interface';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,
    ReactiveFormsModule, MealComponentComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  userService: UserService = inject(UserService);
  mealsByDay?: TodayMeal[] = [];

  disheService: DisheService = inject(DisheService);

  curentUser!: User;
  user!: User;

  form!: FormGroup;

  constructor() {
    this.dataUpdate();
  }

  submitForm() {
    if (this.form && this.form.valid) {
      const updatedUser: User = {
        ...this.user,
        ...this.form.value
      };
      this.userService.saveUser(updatedUser);
      this.dataUpdate();
    } else {
      alert('Form is invalid');
    }
    window.location.reload();
  }

  dataUpdate() {
    this.curentUser = this.authService.getUser();
    if (!this.curentUser) {
      this.router.navigate(['/login']);
    } else {
      this.disheService.getMealsByDay(this.curentUser.id).subscribe(data => {
        this.mealsByDay = data;
      });
      this.userService.getUserByName(this.curentUser.username).subscribe(user => {
        this.user = user;
        this.form = new FormGroup({
          firstname: new FormControl(this.user?.firstname || '', Validators.required),
          age: new FormControl(this.user?.age || null, [Validators.required, Validators.min(1)]),
          weight: new FormControl(this.user?.weight || null, [Validators.required, Validators.min(1)]),
          height: new FormControl(this.user?.height || null, [Validators.required, Validators.min(50)]),
          goal: new FormControl(this.user?.goal || '', Validators.required)
        });
      });
    }
  }


}
