import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChateauComboSheetComponent } from './chateau-combo-sheet.component';

describe('ChateauComboSheetComponent', () => {
  let component: ChateauComboSheetComponent;
  let fixture: ComponentFixture<ChateauComboSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChateauComboSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChateauComboSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
