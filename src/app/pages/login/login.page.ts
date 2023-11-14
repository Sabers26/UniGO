import { UsuarioStorageService } from './../../services/storage/usuario-storage.service';
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth-firebase/auth.service';
import { UsuarioService } from 'src/app/services/firestore/usuario/usuario.service';
import { ViajesService } from 'src/app/services/firestore/viajes/viajes.service';
import { Viaje } from 'src/app/interfaces/viaje';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  handleRefresh(event:any) {
    setTimeout(() => {
      this.form = this.formBuilder.group({
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required]]
      });
      event.target.complete();
    }, 2000);
  }

  form:FormGroup;

  usuario:Usuario={
    email:"",
    password:"",
    nombre:"",
  }
  bandera = false
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private storage:Storage,
    private fireStore:UsuarioService,
    private storeViaje:ViajesService,
    private authFire:AuthService,
    private toastController:ToastController,
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

  async login()
  {
    this.bandera=true
    this.usuario.email = this.form.get("email")?.value;
    this.usuario.password = this.form.get("password")?.value;

    const user= await this.authFire.login(this.usuario).catch((error)=>{
      if(error.code==="auth/invalid-login-credentials")
      {
        this.bandera = false
        this.presentToast("Email y/o contraseña incorrecta")
      }
      if(error.code==="auth/too-many-requests")
      {
        this.bandera = false
        this.presentToast("Demasiados intentos detectados. La cuenta fue bloqueda")
      }
      if(error.code==="auth/network-request-failed")
      {
        this.bandera = false
        this.storage.set("sesion",this.usuario)
        this.storage.set("conexion",2)
        let viaje=this.storage.get("viaje")
        this.bandera=false
        if(viaje!==undefined)
        {
          this.router.navigate(["/tabs/viajes"])
        }
        else{
          this.router.navigate(["/tabs/home"])
        }
      }
    })

    if(user)
    {
      let promesa:any
      await this.fireStore.obtenerUsuario(this.usuario).then((datosUsuario)=>{
        this.usuario=datosUsuario
        this.storeViaje.obtenerViaje(this.usuario).then((viaje)=>{
          this.storage.set("sesion", this.usuario)
          this.storage.set("conexion", 1)
          this.bandera=false
          const viajePasajero = this.storeViaje.buscarViajePasajero(this.usuario).then((dato)=>{
            promesa=dato
          })
          console.log(promesa)
          console.log(viaje)
          if(viaje!==undefined)
          {
            this.storage.set("viaje", viaje)
            console.log("hola")
            this.router.navigate(["/tabs/viajes"])
          }
          else if(promesa!==undefined)
          {
            viajePasajero.then((viaje)=>{
              console.log(viaje)
              if(viaje!==undefined)
              {
                this.storage.set("viaje", viaje)
                this.router.navigate(["/tabs/viajes"])
              }
              this.router.navigate(["/tabs/home"])
            })
          }
          else
          {
            console.log("holita")
            this.router.navigate(["/tabs/home"])
          }
        })
      })
    }
  }
  /* async login()
  {
    this.bandera=true
    this.usuario.email = this.form.get("email")?.value;
    this.usuario.password = this.form.get("password")?.value;

    await this.authFire.login(this.usuario).then(()=>{
      this.fireStore.obtenerUsuario(this.usuario).then((datosUsuario)=>{
        this.usuario=datosUsuario
        this.storage.login(this.usuario)
        this.storage.addConexion(1)
        this.storeViaje.obtenerViaje(this.usuario).then((viaje)=>{
          console.log("Lllegbue aqasdihasgdkjasdkajshdkajsjdh")
          console.log(viaje)
          if(viaje!==undefined && viaje.conductor.email==this.usuario.email)
          {
            console.log("asdasdx222222")
            console.log(viaje)
            this.storage.addViajeLocal(viaje)
            this.router.navigate(["/tabs/viajes"])
          }
          else
          {
            this.router.navigate(["/tabs/home"])
          }
        })
      }) 
    }).catch((error)=>{
      if(error.code==="auth/invalid-login-credentials")
      {
        this.bandera = false
        this.presentToast("Email y/o contraseña incorrecta")
      }
      if(error.code==="auth/too-many-requests")
      {
        this.bandera = false
        this.presentToast("Demasiados intentos detectados. La cuenta fue bloqueda")
      }
      if(error.code==="auth/network-request-failed")
      {
        this.bandera = false
        this.storage.login(this.usuario)
        this.storage.addConexion(2)
        this.storage.getViajeLocal().then((viaje)=>{
          if(viaje!==undefined)
          {
            this.router.navigate(["/tabs/viajes"])
          }
          else
          {
            this.router.navigate(["/tabs/home"])
          }
        })
      }
    })
  } */

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
