import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAndFamilyStepperComponent } from './person-and-family-stepper.component';

describe('PersonAndFamilyStepperComponent', () => {
  let component: PersonAndFamilyStepperComponent;
  let fixture: ComponentFixture<PersonAndFamilyStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonAndFamilyStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonAndFamilyStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
