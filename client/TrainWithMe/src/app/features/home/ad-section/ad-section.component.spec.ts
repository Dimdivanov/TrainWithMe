import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSectionComponent } from './ad-section.component';

describe('AdSectionComponent', () => {
  let component: AdSectionComponent;
  let fixture: ComponentFixture<AdSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
