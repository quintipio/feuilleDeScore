import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarwinSheetComponent } from './darwin-sheet.component';

describe('DarwinSheetComponent', () => {
  let component: DarwinSheetComponent;
  let fixture: ComponentFixture<DarwinSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarwinSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarwinSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
