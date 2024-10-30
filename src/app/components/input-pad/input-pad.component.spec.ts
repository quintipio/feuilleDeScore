import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPadComponent } from './input-pad.component';

describe('InputPadComponent', () => {
  let component: InputPadComponent;
  let fixture: ComponentFixture<InputPadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
