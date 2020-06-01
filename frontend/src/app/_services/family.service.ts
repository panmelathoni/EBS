 import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Family } from '../_models/family.model'
import { TokenStorageService } from './token-storage.service';

const ADDRESS_API = '/api/';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE',
  })
};


@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.tokenStorage.doLogin();
   }

  createFamily(family: Family): Observable<any> {
    return this.http.post(ADDRESS_API + 'families', {
      name: family.name,
      max_persons: parseInt(family.max_persons.toString()),
      persons: family.persons,
    }, httpOptions);
  }

  getFamilies(): Observable<Family[]> {
    return this.http.get<Family[]>(ADDRESS_API + 'families');
  }

   getFamilyById(id: number): Observable<Family> {
    return this.http.get<Family>(ADDRESS_API + 'families/' + id);
  }

}