import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YamsSheetComponent } from './yams-sheet.component';

describe('YamsSheetComponent', () => {
  let component: YamsSheetComponent;
  let fixture: ComponentFixture<YamsSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YamsSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YamsSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
