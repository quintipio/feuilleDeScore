import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DorfromantikSheetComponent } from './dorfromantik-sheet.component';

describe('DorfromantikSheetComponent', () => {
  let component: DorfromantikSheetComponent;
  let fixture: ComponentFixture<DorfromantikSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DorfromantikSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DorfromantikSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
