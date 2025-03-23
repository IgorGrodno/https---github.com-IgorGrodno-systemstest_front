import { userRole } from "./userRole.interface";

export interface User {
    id: number,
    username: string,
    email: string,
    firstname: string,
    age: number,
    weight: number,
    height: number,
    goal: string,
    roles: userRole[],
    token: string
}
