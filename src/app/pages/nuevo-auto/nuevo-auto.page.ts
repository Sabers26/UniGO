import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nuevo-auto',
  templateUrl: './nuevo-auto.page.html',
  styleUrls: ['./nuevo-auto.page.scss'],
})
export class NuevoAutoPage implements OnInit {
  form:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router:Router) 
  { 
    this.form = this.formBuilder.group({
      patente: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      color: ['', [Validators.required]],
      capacidad: ['', [Validators.required]],
    });
  }


  ngOnInit() {
  }

  get errorControl(){
    return this.form?.controls;
  }

  async agregar(){

  }

}
