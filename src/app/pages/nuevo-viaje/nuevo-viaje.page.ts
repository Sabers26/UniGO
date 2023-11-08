import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-viaje',
  templateUrl: './nuevo-viaje.page.html',
  styleUrls: ['./nuevo-viaje.page.scss'],
})
export class NuevoViajePage implements OnInit {
  form:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
  ) 
  { 
    this.form = this.formBuilder.group({
      direccion: ['', [Validators.required]],
      costo: ['', [Validators.required]],
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
