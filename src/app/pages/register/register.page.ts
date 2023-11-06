import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { AutenticacionFirebaseService } from 'src/app/services/autenticacion-firebase.service';
import { StoreFireService } from 'src/app/services/store-fire.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  mensaje_error:string = "";

  usuario:Usuario={
    email:"",
    password:"",
    perfil:{nombre:""},
    patente:""
  }
  

  constructor(
    private formBuilder: FormBuilder, 
    private registroFire:AutenticacionFirebaseService,
    private router:Router,
    private toastController:ToastController,
    private storeFire:StoreFireService
    ) {
      this.storeFire.getUsuario(this.usuario)
      this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit() {
  }

  get errorControl(){
    return this.form?.controls;
  }


  async registrarse(){
    this.usuario.perfil.nombre = this.form.get('nombre')?.value;
    this.usuario.email = this.form.get('email')?.value;
    this.usuario.password = this.form.get('password')?.value;
    
    const user = await this.registroFire.registrarUsuario(this.usuario).catch((error)=>{
      if(error.code==="auth/email-already-in-use" || error.code==="001")
      {
        this.presentToast("El email ingresado ya se encuentra registrado");
      }
    })
    if(user)
    {
      this.storeFire.addUsuario(this.usuario)
      this.router.navigate(['/login']); //como hago que esto no suceda si da error AHHHHHHH
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
