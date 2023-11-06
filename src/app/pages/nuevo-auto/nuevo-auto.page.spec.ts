import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevoAutoPage } from './nuevo-auto.page';

describe('NuevoAutoPage', () => {
  let component: NuevoAutoPage;
  let fixture: ComponentFixture<NuevoAutoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NuevoAutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
