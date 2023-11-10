import { Auto } from "./auto";

export interface Usuario {
    email:string,
    nombre:string,
    password:string,
    auto?:Auto
}
