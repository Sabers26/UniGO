import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/interfaces/usuario';
import { Viaje } from 'src/app/interfaces/viaje';


@Injectable({
  providedIn: 'root'
})
export class ViajesService {
  
  pathViajes="/viajes"

  constructor(private fireStore:AngularFirestore) {

  }

  async addViaje(viaje:Viaje)
  {
    await this.fireStore.collection(this.pathViajes).doc(viaje.conductor.auto?.patente).set(viaje)
  }

  async getAllViajes():Promise<Viaje[]>
  {
    return new Promise((resolve, reject)=>{
      let conductor:Usuario={
        email:"",
        nombre:"",
        password:""
      }
      let viaje:Viaje={
        fecha_viaje:"",
        hora_salida:"",
        conductor:conductor,
        destino:"",
        costo:0,
        pasajeros:[]
      }
      let viajes:Viaje[]=[]

      this.fireStore.collection(this.pathViajes).get().subscribe((docs)=>{
      docs.forEach((item)=>{
        let datos:any=item.data()
        viaje.fecha_viaje=datos["fecha_viaje"]
        viaje.hora_salida=datos['hora_salida']
        viaje.destino=datos['destino']
        viaje.conductor=datos["conductor"]
        viaje.pasajeros=datos["pasajeros"]
        viajes.push(viaje)
      })
      resolve(viajes)
    })
    })
  }
}
