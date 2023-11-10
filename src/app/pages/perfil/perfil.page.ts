import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth-firebase/auth.service';
import { UsuarioStorageService } from 'src/app/services/storage/usuario-storage.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario:Usuario={
    email:"",
    password:"",
    nombre:""
  }
  bandera=true;
  constructor(private router:Router, private storage:UsuarioStorageService, private authFire:AuthService) {
    this.storage.getSesion().then((sesion)=>{
      this.usuario=sesion
      this.bandera=false
    })
  }

  ngOnInit() {
    
  }
  async logOut()
  {
    this.bandera=true
    this.storage.logOut()
    this.authFire.logOut()
    this.router.navigate(["/bienvenida"])
  }
  
}
