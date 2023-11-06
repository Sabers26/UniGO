import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionFirebaseService {

  constructor(private auth:AngularFireAuth) { }

  async registrarUsuario(usuario:Usuario)
  {
    return await this.auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
    
  }

  async iniciarSesion(usuario:Usuario)
  {
    return await this.auth.signInWithEmailAndPassword(usuario.email, usuario.password)
  }

  async getSesion()
  {
    return this.auth.currentUser
  }
}
