import { MessageSnackBarService } from './../_services/message-snack-bar.service';
import { Person } from './../_models/person.model';
import { Component, OnInit } from '@angular/core';
import { PersonService } from '../_services/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';






@Component({
  selector: 'app-delete-person',
  templateUrl: './delete-person.component.html',
  styleUrls: ['./delete-person.component.css'],
})
export class DeletePersonComponent implements OnInit {
  person: Person;
  personFormGroup: FormGroup;
  hide = true;
  messageSnackBarService: any;
  

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBarService: MessageSnackBarService,
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

  deletePerson():void {
    this.personService.delete(this.person.id).subscribe(()=>{
      this.messageSnackBarService.showSuccessMessage("Person deleted successfully")
    })
  }

  cancel(): void {
    this.router.navigate(['/person'])
  }
}
