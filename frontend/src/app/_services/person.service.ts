import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../_models/person.model';

const ADDRESS_API = '/api/';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods' : 'GET,PUT,PATCH,POST,DELETE',
  })
};

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.tokenStorage.doLogin();
   }


  createPerson(person : Person): Observable<any> {
    return this.http.post(ADDRESS_API + 'persons', {
      username: person.username,
      password: person.password,
      name: person.name,
      age: person.age,
      family: person.family,
      role: person.role
    }, httpOptions);
  }

  uptadePerson(person : Person): Observable<any> {
    return this.http.patch(ADDRESS_API + 'persons', {
      family: person.family
    }, httpOptions);
  }

  getPersons(): Observable<Person[]> {
    
    return this.http.get<Person[]>(ADDRESS_API + 'persons');
  }

   getPersonById(id: number): Observable<Person> {
    return this.http.get<Person>(ADDRESS_API + 'persons/' + id);
  }

  delete(id: number): Observable<Person> {
    return this.http.delete<Person>(ADDRESS_API + 'persons/' + id)

  }
}