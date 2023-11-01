import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionFirebaseService } from 'src/app/services/autenticacion-firebase.service';
import { ToastController } from '@ionic/angular';
import { AutenticacionStorageService } from 'src/app/services/autenticacion-storage.service';

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
    password:''
  }
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private authFire:AutenticacionFirebaseService,
    private toastController:ToastController,
    private authStorage:AutenticacionStorageService
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

      }
    })
    if(user)
    {
      await this.authStorage.iniciarSesion(this.usuario)
      let extras:NavigationExtras = {
        state:
        {
          datos: this.usuario,
        }
      }
      this.router.navigate(["/tabs/home"], extras)
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
