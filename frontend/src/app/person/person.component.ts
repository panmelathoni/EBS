import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../template/header/header.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  constructor(private headerService : HeaderService, private tokenStorage: TokenStorageService ) {
    headerService.headerData = {
      title: 'Person',
      icon: 'account_box',
      routeUrl: '',
      loggedRole:  this.tokenStorage.getUser() !=null ? this.tokenStorage.getUser().person_role : ""
    }    
   }

  ngOnInit(): void {
  }

}
