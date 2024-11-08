import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkullKingSheetComponent } from './skull-king-sheet.component';

describe('SkullKingSheetComponent', () => {
  let component: SkullKingSheetComponent;
  let fixture: ComponentFixture<SkullKingSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkullKingSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkullKingSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
