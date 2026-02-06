import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopcornSheetComponent } from './popcorn-sheet.component';

describe('PopcornSheetComponent', () => {
  let component: PopcornSheetComponent;
  let fixture: ComponentFixture<PopcornSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopcornSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopcornSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
