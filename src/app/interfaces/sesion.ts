import { Auto } from "./auto";
import { Usuario } from "./usuario";

export interface Sesion {
    id:number,
    usr:Usuario,
    aut:Auto
}
