import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkullKingConfigComponent } from './skull-king-config.component';

describe('SkullKingConfigComponent', () => {
  let component: SkullKingConfigComponent;
  let fixture: ComponentFixture<SkullKingConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkullKingConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkullKingConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
