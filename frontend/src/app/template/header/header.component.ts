import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
      this.isLoggedIn = this.tokenStorage.isLoggedIn();
  }
  

}
