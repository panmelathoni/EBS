import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { MessageSnackBarService } from './message-snack-bar.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_LOGGED = 'logged-user'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private authService : AuthService, private snackBarMessage: MessageSnackBarService) { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public isLoggedIn(): boolean {
    return sessionStorage.getItem(TOKEN_KEY) != null;
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public saveLoggedUser(person) {
    window.sessionStorage.removeItem(USER_LOGGED);
    window.sessionStorage.setItem(USER_LOGGED, JSON.stringify(person));
  }

  public getLoggedUser() {
    return JSON.parse(sessionStorage.getItem(USER_LOGGED));
  }

  public doLogin(){
    //do login always before any call
    const userLogged = this.getLoggedUser()
    if (userLogged != null)
    {
      
      this.authService.login(userLogged).subscribe(
        data => {
          this.saveToken(data.token);
          this.saveUser(data);
          this.saveLoggedUser(data);
        },
        err => {
          this.snackBarMessage.showErrorMessage(err.error.message);
        }
      );
    }  
      
}
}

