import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QwirkleSheetComponent } from './qwirkle-sheet.component';

describe('QwirkleSheetComponent', () => {
  let component: QwirkleSheetComponent;
  let fixture: ComponentFixture<QwirkleSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QwirkleSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QwirkleSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
