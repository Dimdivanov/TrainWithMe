import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerTypeSectionComponent } from './trainer-type-section.component';

describe('TrainerTypeSectionComponent', () => {
  let component: TrainerTypeSectionComponent;
  let fixture: ComponentFixture<TrainerTypeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerTypeSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerTypeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
