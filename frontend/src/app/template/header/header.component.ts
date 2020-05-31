import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  constructor(private tokenStorage: TokenStorageService, private headerService : HeaderService ) { }

  ngOnInit(): void {
      this.isLoggedIn = this.tokenStorage.isLoggedIn();
  }

  get title(): string {
    return this.headerService.headerData.title
  }
  
  
  get icon(): string {
    return this.headerService.headerData.icon
  }
  
  
  get routeUrl(): string {
    return this.headerService.headerData.routeUrl
  }

  get loggedRole(): string {
    return this.headerService.headerData.loggedRole
  }
  

}
