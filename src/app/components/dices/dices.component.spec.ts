import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DicesComponent } from './dices.component';

describe('DicesComponent', () => {
  let component: DicesComponent;
  let fixture: ComponentFixture<DicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
