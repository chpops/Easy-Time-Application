import { Injectable } from "@angular/core";
import { User } from "../interfaces";
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService{

    private URL = 'http://localhost:4000/api';
    constructor(private http: HttpClient){
      
    }

    register(){}
    
    login(user: User): Observable<{token: string}> {
        return this.http.post<{token: string}>(this.URL + '/login', user);
    }

    loggedIn() {
        return !!localStorage.getItem('token');
      }

      logout() {
        localStorage.removeItem('token');
        // this.router.navigate(['/tasks']);
      }
    
      getToken() {
        return localStorage.getItem('token');
      }

     
}