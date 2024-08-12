import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMapaComponent } from './ver-mapa.component';

describe('VerMapaComponent', () => {
  let component: VerMapaComponent;
  let fixture: ComponentFixture<VerMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerMapaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
