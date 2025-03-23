import { Component, inject, Input } from '@angular/core';
import { Dish } from '../../../interfaces/dish.interface';
import { DisheService } from '../../../servises/Dishe.service';
import { TodayMeal } from '../../../interfaces/todayMeal.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meal-component',
  imports: [CommonModule],
  templateUrl: './meal-component.component.html',
  styleUrl: './meal-component.component.css'
})
export class MealComponentComponent {
  dishes?: Dish[];
  meals?: TodayMeal[];
  @Input() userId!: number;
  mealConstructor: MealDish[] = [];
  mealCalories: number = 0;
  mealDishId: number = 0;
  mealsByDay?: TodayMeal[] = [];

  disheService: DisheService = inject(DisheService);


  ngOnInit() {
    this.refreshData();
  }

  addDish(dish: Dish) {
    this.mealDishId++;
    const mealDish: MealDish = {
      id: this.mealDishId, dish: dish
    };
    this.mealConstructor.push(mealDish);
    this.mealCalories += dish.calories;
  }

  removeDish(mealDish: MealDish) {
    this.mealConstructor = this.mealConstructor.filter(item => item.id !== mealDish.id);
    this.mealCalories -= mealDish.dish.calories;
  }

  addMeal() {
    if (this.mealCalories > 0) {
      const dishes = this.mealConstructor.map(item => item.dish);
      this.disheService.addMeal(this.userId, dishes).subscribe(() => {
        this.refreshData();
        this.mealConstructor = [];
        this.mealCalories = 0;
      });
    }
  }

  refreshData() {
    this.disheService.getAllDishes().subscribe(data => {
      this.dishes = data.sort((a, b) => a.calories - b.calories);
    });
    this.disheService.getTodayMeals(this.userId).subscribe(data => {
      this.meals = data;
    });
    
  }

  deleteTodayMeal(mealId: number) {
    this.disheService.deleteTodayMeal(mealId).subscribe(() => {
      this.refreshData();
    });
  }
}

interface MealDish {
  id: number,
  dish: Dish
}
