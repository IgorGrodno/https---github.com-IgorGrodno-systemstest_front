import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./Auth.service";
import { Dish } from "../interfaces/dish.interface";
import { TodayMeal } from "../interfaces/todayMeal.interface";

@Injectable({
    providedIn: 'root'
})
export class DisheService {
    constructor(private http: HttpClient, private authService: AuthService) { }

    router: Router = inject(Router);

    getAllDishes() {
        return this.http.get<Dish[]>('http://localhost:8080/api/dish/');
    }

    getTodayMeals(userId: number) {
        return this.http.get<TodayMeal[]>('http://localhost:8080/api/dish/todaymeals/' + userId);
    }

    getMealsByDay(userId: number) {
        return this.http.get<TodayMeal[]>('http://localhost:8080/api/dish/daymeals/' + userId);
    }

    addMeal(userId: number, dishes: Dish[]) {
        return this.http.post<Dish[]>('http://localhost:8080/api/dish/meal/' + userId, dishes);
    }

    deleteTodayMeal(mealId: number) {
        return this.http.delete('http://localhost:8080/api/dish/meal/' + mealId);
    }
}
