
import { Usuario } from "./usuario";

export interface Viaje {
    fecha:Date,
    salida:string,
    destino:string,
    conductor:Usuario,
    pasajeros?:Usuario[]
}
