import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../_services/person.service';
import { FamilyService } from '../_services/family.service';
import { MessageSnackBarService } from '../_services/message-snack-bar.service';
import { Person } from '../_models/person.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.css'],
})
export class UpdatePersonComponent implements OnInit {
  personFormGroup: FormGroup;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private familyService: FamilyService,
    private snackBarService: MessageSnackBarService,
    private route: ActivatedRoute,
    private router: Router
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

    const id = this.route.snapshot.paramMap.get('id');
    this.personService.getPersonById(parseInt(id)).subscribe((person) => {
      this.personFormGroup.patchValue({
        username: person.username,
        password: person.password,
        name: person.name,
        age: person.age,
        role: person.role,
        family: person.family,
      });
    });
  }
  public hasErrorPerson = (controlName: string, errorName: string) => {
    return this.personFormGroup.controls[controlName].hasError(errorName);
  };

  public updatePerson = (personFormGroupValue) => {
    if (this.personFormGroup.valid) {
      this.executePersonUpdate(personFormGroupValue);
    }
  };

  private executePersonUpdate = (personFormGroupValue) => {
    let person: Person = {
      name: personFormGroupValue.name,
      username: personFormGroupValue.username,
      password: personFormGroupValue.password,
      age: personFormGroupValue.age,
      family: personFormGroupValue.family,
      role: personFormGroupValue.role,
    };
    console.log('pre update person');
    console.log(person);

    this.personService.uptadePerson(person).subscribe(
      (data) => {
        this.snackBarService.showSuccessMessage(
          'Person ' + data.name + ' updated succesfuly'
        );
      },
      (err) => {
        console.log(err);
        this.snackBarService.showErrorMessage(
          'Error while updating person : ' + err.message
        );
      }
    );
  };

  cancel():void {
    this.router.navigate(['/person'])
  };
}
