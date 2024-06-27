import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMapaComponent } from './crear-mapa.component';

describe('CrearMapaComponent', () => {
  let component: CrearMapaComponent;
  let fixture: ComponentFixture<CrearMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearMapaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
