import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  mensaje_error:string = "";

  

  constructor(
    private formBuilder: FormBuilder, 
    private router:Router,
    private toastController:ToastController
    ) {
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
