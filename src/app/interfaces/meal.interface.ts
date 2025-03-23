import { Dish } from "./dish.interface";

export interface Meal {
    id: number,
    userId:number,
    dishes: Dish[]
}