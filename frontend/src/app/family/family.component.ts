import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../template/header/header.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {

  constructor(private headerService : HeaderService, private tokenStorage: TokenStorageService) {
    
    headerService.headerData = {
      title: 'Family',
      icon: 'family_restroom',
      routeUrl: '/family',
      loggedRole:  this.tokenStorage.getUser() !=null ? this.tokenStorage.getUser().person_role : ""

    }    
   }

  ngOnInit(): void {
  }

}
