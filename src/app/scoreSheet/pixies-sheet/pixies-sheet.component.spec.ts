import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixiesSheetComponent } from './pixies-sheet.component';

describe('PixiesSheetComponent', () => {
  let component: PixiesSheetComponent;
  let fixture: ComponentFixture<PixiesSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PixiesSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PixiesSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
