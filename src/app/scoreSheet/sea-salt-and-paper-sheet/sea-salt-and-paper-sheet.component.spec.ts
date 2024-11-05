import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeaSaltAndPaperSheetComponent } from './sea-salt-and-paper-sheet.component';

describe('SeaSaltAndPaperSheetComponent', () => {
  let component: SeaSaltAndPaperSheetComponent;
  let fixture: ComponentFixture<SeaSaltAndPaperSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeaSaltAndPaperSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeaSaltAndPaperSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
