export interface Usuario {
    perfil:Perfil
    email:string,
    password:string,
    patente:string
}

interface Perfil {
    nombre:string
}
