import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtisansSheetComponent } from './courtisans-sheet.component';

describe('CourtisansSheetComponent', () => {
  let component: CourtisansSheetComponent;
  let fixture: ComponentFixture<CourtisansSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtisansSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtisansSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
