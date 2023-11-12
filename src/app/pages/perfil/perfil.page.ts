import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IonRefresher } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth-firebase/auth.service';
import { UsuarioStorageService } from 'src/app/services/storage/usuario-storage.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  handleRefresh(event:any) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  usuario:Usuario={
    email:"",
    password:"",
    nombre:""
  }
  bandera=false;
  constructor(private router:Router, private storage:UsuarioStorageService, private authFire:AuthService) {
  }

  ionViewDidEnter() {
    this.storage.getSesion().then((datosUsuario)=>{
      this.bandera=false
      this.usuario=datosUsuario
      if(datosUsuario.auto!==undefined)
      {
        this.usuario.auto=datosUsuario.auto
      }
    })
  }
  ngOnInit() {
    
  }
  async logOut()
  {
    this.bandera=true
    this.storage.logOut()
    this.authFire.logOut()
    this.bandera=false
    this.router.navigate(["/bienvenida"])
  }
  
}
