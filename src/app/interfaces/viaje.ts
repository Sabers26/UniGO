import { Auto } from "./auto";
import { Usuario } from "./usuario";

export interface Viaje {
    direccion:string,
    costo:number,
    conductor:Usuario,
    auto:Auto,
    pasajeros:Usuario[],
    estado:boolean
}
