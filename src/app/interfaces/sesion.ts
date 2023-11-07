import { Auto } from "./auto";
import { Usuario } from "./usuario";
import { Viaje } from "./viaje";

export interface Sesion {
    id:number,
    usr:Usuario,
    aut:Auto,
    viaje:Viaje
}
