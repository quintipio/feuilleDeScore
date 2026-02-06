import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbioseSheetComponent } from './symbiose-sheet.component';

describe('SymbioseSheetComponent', () => {
  let component: SymbioseSheetComponent;
  let fixture: ComponentFixture<SymbioseSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SymbioseSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SymbioseSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
