import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Viaje } from 'src/app/interfaces/viaje';


@Injectable({
  providedIn: 'root'
})
export class ViajesService {
  pathViajes="/viajes"

  constructor(private fireStore:AngularFirestore) { }

  async addViaje(viaje:Viaje)
  {
    this.fireStore.collection(this.pathViajes).doc(viaje.conductor.auto?.patente).set(viaje)
  }
}
