import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth-firebase/auth.service';
import { UsuarioService } from 'src/app/services/firestore/usuario/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  mensaje_error:string = "";

  usuario:Usuario={
    email:'',
    nombre:'',
    password:'',
  }

  constructor(
    private formBuilder: FormBuilder, 
    private router:Router,
    private toastController:ToastController,
    private authFire:AuthService,
    private authStore:UsuarioService
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
    this.usuario.nombre = this.form.get("nombre")?.value;
    this.usuario.email = this.form.get("email")?.value;
    this.usuario.password = this.form.get("password")?.value;

    await this.authFire.addUsuario(this.usuario).then(()=>{
      this.authStore.addUsuario(this.usuario)
      this.router.navigate(['/login'])
    }).catch((error)=>{
      if(error.code==="auth/email-already-in-use")
      {
        this.presentToast("El email ingresado ya se encuentra registrado")
      }
      if(error.code==="auth/network-request-failed")
      {
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
