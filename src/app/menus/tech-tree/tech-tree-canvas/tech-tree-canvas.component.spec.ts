import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechTreeCanvasComponent } from './tech-tree-canvas.component';

describe('TechTreeCanvasComponent', () => {
  let component: TechTreeCanvasComponent;
  let fixture: ComponentFixture<TechTreeCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechTreeCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechTreeCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
