import { HeaderData } from './header-data.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  
  
  constructor(private tokenStorage: TokenStorageService) { 
  }

  private _headerData = new BehaviorSubject<HeaderData>({
    title: 'Person',
    icon: 'account_box',
    routeUrl: '',
    loggedRole:  this.tokenStorage.getUser() !=null ? this.tokenStorage.getUser().person_role : ""
    
  })





  get headerData(): HeaderData {
    return this._headerData.value
  }

  set headerData(headerdata: HeaderData) {
   this._headerData.next(headerdata)
  }
}
