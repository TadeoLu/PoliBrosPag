import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMapaComponent } from './editar-mapa.component';

describe('EditarMapaComponent', () => {
  let component: EditarMapaComponent;
  let fixture: ComponentFixture<EditarMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarMapaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
