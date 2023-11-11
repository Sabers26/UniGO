
import { Usuario } from "./usuario";

export interface Viaje {
    comentarios?:string,
    destino:string,
    conductor:Usuario,
    pasajeros?:Usuario[]
}
