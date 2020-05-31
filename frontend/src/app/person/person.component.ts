import { MessageSnackBarService } from './../_services/message-snack-bar.service';
import { PersonService } from './../_services/person.service';
import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../template/header/header.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Person } from '../_models/person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  persons: Person[];
  public person: Person = {
    name: "Panmela",
    username: "ptms",
    password: "12345",
    age: "27",
    family: 0,
    role: "Admin",
  };

  displayedColumns = ['id','name', 'username', 'password', 'age', 'family', 'role', 'action'];

  constructor(private headerService : HeaderService, private tokenStorage: TokenStorageService, private personService: PersonService, private snackBarService: MessageSnackBarService ) {
    headerService.headerData = {
      title: 'Person',
      icon: 'account_box',
      routeUrl: '',
      loggedRole:  this.tokenStorage.getUser() !=null ? this.tokenStorage.getUser().person_role : ""
    }    
   }

  ngOnInit(): void {
    this.getPersonsFromComponent();
  }

  isAdmin(){
    return this.headerService.headerData.loggedRole != null && this.headerService.headerData.loggedRole == "admin";
  }
   
   
  //Colocar os valores do form de pessoas 
  updatePersonFromComponent(): void {
    this.personService.uptadePerson(this.person).subscribe(
      data => {
        this.snackBarService.showSuccessMessage("Person " + data.name + " updated succesfuly");
      },
      err => {
        this.snackBarService.showErrorMessage("Error while updating person : " +  err.message);
      }
    );
  }

  //Colocar os valores do form de pessoas 
  getPersonsFromComponent(): void {
    this.personService.getPersons().subscribe(
      data => {
        this.persons = data;
        this.snackBarService.showSuccessMessage(data.length + " Persons listed succesfuly");
      },
      err => {
        this.snackBarService.showErrorMessage("Error while list person : " +  err.message);
      }
    );
  }

  getPersonByIdFromComponent(): void {
    this.personService.getPersonById(1).subscribe(
      data => {
        this.person = data;
        this.snackBarService.showSuccessMessage(" Persons " + data.name + " listed succesfuly");
      },
      err => {
        this.snackBarService.showErrorMessage("Error while list person : " +  err.message);
      }
    );
  }

}

