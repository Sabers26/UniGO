import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from '../firestore/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authFire:AngularFireAuth, private authStore:UsuarioService) { }

  async addUsuario(usuario:Usuario)
  {
    return await this.authFire.createUserWithEmailAndPassword(usuario.email,usuario.password)
  }

  async login(usuario:Usuario)
  {
    return await this.authFire.signInWithEmailAndPassword(usuario.email,usuario.password)
  }
}
