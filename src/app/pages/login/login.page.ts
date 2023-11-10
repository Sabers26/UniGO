import { UsuarioStorageService } from './../../services/storage/usuario-storage.service';
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth-firebase/auth.service';
import { UsuarioService } from 'src/app/services/firestore/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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
    private storage:UsuarioStorageService,
    private fireStore:UsuarioService,
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

    await this.authFire.login(this.usuario).then(()=>{
      this.fireStore.obtenerUsuario(this.usuario).then((datosUsuario)=>{
        this.usuario=datosUsuario
        this.storage.login(this.usuario)
        this.router.navigate(["/tabs/home"])
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
        this.presentToast("Error de conexion...Verifique su conexion a internet")
      }
    })
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
