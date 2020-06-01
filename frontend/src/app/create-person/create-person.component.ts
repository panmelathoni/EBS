import { Component, OnInit } from '@angular/core';
import { MessageSnackBarService } from './../_services/message-snack-bar.service';
import { FamilyService } from './../_services/family.service';
import { PersonService } from './../_services/person.service';

import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';

import { Person } from '../_models/person.model';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.css'],
})
export class CreatePersonComponent implements OnInit {
  personFormGroup: FormGroup;
  familyFormGroup: FormGroup;
  isOptional: boolean = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private familyService: FamilyService,
    private snackBarService: MessageSnackBarService
  ) {}

  ngOnInit(): void {
    this.personFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      name: ['', Validators.required],
      age: [''],
      role: [''],
      family: [''],
    });

    this.familyFormGroup = this.formBuilder.group({
      inputteste2: ['', Validators.required],
    });
  }

  public hasErrorPerson = (controlName: string, errorName: string) => {
    return this.personFormGroup.controls[controlName].hasError(errorName);
  };

  public createPerson = (personFormGroupValue) => {
    if (this.personFormGroup.valid) {
      this.executePersonCreation(personFormGroupValue);
    }
  };

  private executePersonCreation = (personFormGroupValue) => {
    let person: Person = {
      name: personFormGroupValue.name,
      username: personFormGroupValue.username,
      password: personFormGroupValue.password,
      age: personFormGroupValue.age,
      family: personFormGroupValue.family,
      role: personFormGroupValue.role,
    };


    this.personService.createPerson(person).subscribe(
      (data) => {
        this.snackBarService.showSuccessMessage(
          'Person ' + data.name + ' created succesfuly'
        );
      },
      (err) => {

        var error =  err.error != null ? err.error : err.message;
        this.snackBarService.showErrorMessage(

          'Error while creating person : ' + error
        );
      }
    );
  };
}
