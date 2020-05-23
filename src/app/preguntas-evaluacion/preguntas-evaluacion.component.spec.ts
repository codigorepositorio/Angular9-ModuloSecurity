import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasEvaluacionComponent } from './preguntas-evaluacion.component';

describe('PreguntasEvaluacionComponent', () => {
  let component: PreguntasEvaluacionComponent;
  let fixture: ComponentFixture<PreguntasEvaluacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreguntasEvaluacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntasEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
