import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmarViajePage } from './confirmar-viaje.page';

describe('ConfirmarViajePage', () => {
  let component: ConfirmarViajePage;
  let fixture: ComponentFixture<ConfirmarViajePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConfirmarViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
