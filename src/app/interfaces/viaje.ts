
import { Usuario } from "./usuario";

export interface Viaje {
    fecha_viaje:string,
    hora_salida:string,
    destino:string,
    conductor:Usuario,
    comentarios?:string,
    costo:number,
    pasajeros?:Usuario[],
    estado?:string
}
