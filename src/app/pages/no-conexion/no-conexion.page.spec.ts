import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoConexionPage } from './no-conexion.page';

describe('NoConexionPage', () => {
  let component: NoConexionPage;
  let fixture: ComponentFixture<NoConexionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NoConexionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
