import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ViajeServicioService {
  viajePath="/viajes"
  viajeCollection:AngularFirestoreCollection<Viaje>
  constructor(private fireStore:AngularFirestore) { }
}
