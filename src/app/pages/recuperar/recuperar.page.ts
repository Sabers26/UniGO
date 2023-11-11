import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth-firebase/auth.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  usuario:Usuario={
    email:"",
    password:"",
    nombre:"",
  }

  form:FormGroup;

  bandera = false

  constructor
  (
    private formBuilder: FormBuilder,
    private router:Router,
    private authFire:AuthService,
    private toastController:ToastController
  ) 
  { 
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]]
    });
  }

  ngOnInit() {
  }

  onSubmit(){
    this.bandera = true
    this.usuario.email=this.form.get("email")?.value;
    this.authFire.recuperar(this.usuario).then(()=>{
      this.bandera=false
      
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
