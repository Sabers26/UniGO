import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth-firebase/auth.service';
import { UsuarioStorageService } from 'src/app/services/storage/usuario-storage.service';


@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {
  bandera=false
  constructor(private router:Router, private storage:UsuarioStorageService, private authFire:AuthService) { }
  
  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }
  ngOnInit() {
  }
  async login()
  {
    this.bandera=true
    let usuario:Usuario
    await this.storage.getSesion().then((sesion)=>{
      if(sesion!==undefined)
      {
        usuario=sesion
        this.authFire.login(usuario).then(()=>{
          this.storage.addConexion(1)
          this.router.navigate(["/tabs/viajes"])
        }).catch((error)=>{
          if(error.code==="auth/network-request-failed")
          {
            this.storage.addConexion(2)
            this.router.navigate(["/tabs/viajes"])
          }
        })
      }
      else
      {
        this.router.navigate(["/login"])
      }
    })
  }

}
