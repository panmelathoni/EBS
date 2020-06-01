import { NavComponent } from './../template/nav/nav.component';
import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../template/header/header.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Family } from '../_models/family.model';
import { FamilyService } from '../_services/family.service';
import { MessageSnackBarService } from '../_services/message-snack-bar.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {
  families: Family[];
  public family: Family = {
    "id": 10,
    "name": "familyb",
    "max_persons": 2,
    "persons": []

  }
  displayedColumns = ['id','name', 'max_persons', 'persons'];

  constructor(private headerService : HeaderService, private tokenStorage: TokenStorageService, private familyService: FamilyService, private snackBarService: MessageSnackBarService) {
    
    headerService.headerData = {
      title: 'Family',
      icon: 'family_restroom',
      routeUrl: '/family',
      loggedRole:  this.tokenStorage.getUser() !=null ? this.tokenStorage.getUser().person_role : ""

    }    
   }

  ngOnInit(): void {
    this.getFamiliesFromComponent();
  }

   //Colocar os valores do form de pessoas
   createFamilyFromComponent(): void {
    this.familyService.createFamily(this.family).subscribe(
      data => {
        this.snackBarService.showSuccessMessage("Family " + data.name + " created succesfuly");
      },
      err => {
        var error =  err.error != null ? err.error : err.message;
        this.snackBarService.showErrorMessage("Error while creating family : " +  error);
      }
    );
  }

   //Colocar os valores do form de pessoas 
   getFamiliesFromComponent(): void {
    this.familyService.getFamilies().subscribe(
      
      data => {
        this.families = data;
        this.snackBarService.showSuccessMessage(data.length + " Family listed succesfuly");
      },
      err => {
        var error =  err.error != null ? err.error : err.message;
        this.snackBarService.showErrorMessage("Error while list Family : " +  error);
      }
    );
  }

  getPersonByIdFromComponent(): void {
    this.familyService.getFamilyById(1).subscribe(
      data => {
        this.family = data;
        this.snackBarService.showSuccessMessage("Family " + data.name + " listed succesfuly");
      },
      err => {
        var error =  err.error != null ? err.error : err.message;
        this.snackBarService.showErrorMessage("Error while list family : " +  error);
      }
    );
  }



}
