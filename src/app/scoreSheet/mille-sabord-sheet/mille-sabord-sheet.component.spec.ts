import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilleSabordSheetComponent } from './mille-sabord-sheet.component';

describe('MilleSabordSheetComponent', () => {
  let component: MilleSabordSheetComponent;
  let fixture: ComponentFixture<MilleSabordSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MilleSabordSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MilleSabordSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
