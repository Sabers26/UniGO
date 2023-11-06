import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionFirebaseService } from 'src/app/services/autenticacion-firebase.service';
import { ToastController } from '@ionic/angular';
import { AutenticacionStorageService } from 'src/app/services/autenticacion-storage.service';
import { StoreFireService } from 'src/app/services/store-fire.service';
import { Auto } from 'src/app/interfaces/auto';
import { AutoServicioService } from 'src/app/services/auto-servicio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form:FormGroup;

  usuario:Usuario={
    perfil:{nombre:""},
    email:'',
    password:'',
    patente:""
  }
  auto:Auto={
    patente:'',
    modelo:'',
    color:"",
    capacidad:0,
    conductor:''
  }
  idUsuario:any=""
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private authFire:AutenticacionFirebaseService,
    private toastController:ToastController,
    private storeFire:StoreFireService,
    private authStorage:AutenticacionStorageService,
    private autoFire:AutoServicioService
    ) { 
      this.form = this.formBuilder.group({
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required]]
      });
  }

  ngOnInit() {
  }

  get errorControl(){
    return this.form?.controls;
  }

  async iniciarSesion()
  {
    this.usuario.email = this.form.get("email")?.value;
    this.usuario.password = this.form.get("password")?.value;

    const user = await this.authFire.iniciarSesion(this.usuario).catch((error)=>{
      if(error.code==="auth/invalid-login-credentials")
      {
        this.presentToast("Email y/o contraseña incorrecta")
      }
      if(error.code==="auth/too-many-requests")
      {
        this.presentToast("Demasiados intentos detectados. La cuenta fue bloqueda")
      }
      if(error.code==="auth/network-request-failed")
      {
        this.presentToast("Error de conexion...Verifique su conexion a internet")
      }
    })
    if(user)
    {
      await this.storeFire.getUsuario(this.usuario).then(item=>{
        if(item!==undefined)
        {
          this.idUsuario=item.id
          this.usuario.email=item.email
          this.usuario.perfil=item.perfil
        }
      })
      const autito = await this.autoFire.getAuto(this.usuario)
      if(autito!==undefined)
      {
        this.auto.patente=autito.patente
        this.auto.modelo=autito.modelo
        this.auto.color=autito.color
        this.auto.capacidad=autito.capacidad
        this.auto.conductor=autito.conductor
      }
      await this.authStorage.iniciarSesion(1, this.usuario, this.auto)
      this.router.navigate(["/tabs/home"])
    }
  }

  async presentToast(mensaje:string)
  {
    let toast = await this.toastController.create({
      message:mensaje,
      duration:1500,
      position:"top"
    })

    await toast.present()
  }
}
