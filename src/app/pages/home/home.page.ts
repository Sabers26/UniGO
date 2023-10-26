import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario:Usuario={
    nombre:'',
    email:'',
    password:''
  }
  constructor(private router:Router) {
    let datos = this.router.getCurrentNavigation()?.extras.state;

    if(datos!==undefined)
    {
      let usr=datos["credencial"]
      this.usuario.nombre = usr.nombre
      this.usuario.email = usr.email
      this.usuario.password = usr.password
    }
  }

}
