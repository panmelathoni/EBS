import { Person } from './../_models/person.model';
import { MessageSnackBarService } from './../_services/message-snack-bar.service';
import { FamilyService } from './../_services/family.service';
import { PersonService } from './../_services/person.service';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms'


import { Family } from '../_models/family.model';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';



  const initialSelection = [];
const allowMultiSelect = true;
@Component({
  selector: 'app-person-and-family-stepper',
  templateUrl: './person-and-family-stepper.component.html',
  styleUrls: ['./person-and-family-stepper.component.css']
})
export class PersonAndFamilyStepperComponent implements OnInit {

selection = new SelectionModel<Person>(allowMultiSelect, initialSelection);
  familyFormGroup : FormGroup;
  isOptional : boolean = false;
  hide = true;

  persons: Person[];
   personsSelected: Person[];

  displayedColumns = ['select','id','name', 'username', 'password', 'age', 'family', 'role'];

    
    constructor(private formBuilder: FormBuilder, private personService: PersonService, private familyService: FamilyService, private snackBarService: MessageSnackBarService, private router: Router, ) { }

  ngOnInit(): void {

    this.getPersonsFromComponent(); 

    this.familyFormGroup = this.formBuilder.group({
      inputname: ['', Validators.required],
      inputmaxPerson: ['', Validators.required]
    });
  }

  public hasErrorFamily = (controlName: string, errorName: string) =>{
    return this.familyFormGroup.controls[controlName].hasError(errorName);
  }

  public createFamily = (familyFormGroupValue) => {
    if (this.familyFormGroup.valid) {
      this.executeFamilyCreation(familyFormGroupValue);
    }
    this.router.navigate(['/family']);
  }
 
  private executeFamilyCreation = (familyFormGroupValue) => {
    let family: Family = {
      name: familyFormGroupValue.inputname,
      max_persons: familyFormGroupValue.inputmaxPerson,
      persons:this.selection.selected
    }
    this.familyService.createFamily(family).subscribe(
      data => {
        this.snackBarService.showSuccessMessage("Family " + data.name + " created succesfuly");
      },
      err => {
        var error =  err.error != null ? err.error : err.message;
        this.snackBarService.showErrorMessage("Error while creating family : " + error);
      }
    );
  }

  getPersonsFromComponent(): void {
    this.personService.getPersons().subscribe(
      data => {
        this.persons = data;        
      },
      err => {
        var error =  err.error != null ? err.error : err.message;
        this.snackBarService.showErrorMessage("Error while list person : " +  error);
      }
    );
  }

 

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.persons.length;
    return numSelected == numRows;
  }


  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.persons.forEach(row =>{
          this.selection.select(row)
        } );
  }
}
