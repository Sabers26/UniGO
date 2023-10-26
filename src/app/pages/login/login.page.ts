import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { Storage } from '@ionic/storage-angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario:Usuario={
    nombre:'',
    email:'',
    password:''
  }
  constructor(private storage:Storage, private router:Router) { }

  ngOnInit() {
  }

  async onSubmit()
  {
    let datos = await this.storage.get(this.usuario.email)
    let error = "Usuario y/o contraseña incorrecta"
    if(datos!==null)
    {
      if(this.usuario.password == datos.password)
      {
        await this.storage.set("sesion", 1);
        this.usuario.nombre = datos.nombre
        let ext:NavigationExtras={
          state:{
            credencial: this.usuario
          }
        }
        this.router.navigate(["tabs/home"], ext)
      }
      else 
      {
        console.log(error)
      }
    }
    else{
      console.log(error)
    }
  }

}
