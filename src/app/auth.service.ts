import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient

  ) { }

  sendUserData(username: string, password: string): Observable<any> {
    const credentials = "grant_type=password"
      + "&scope=offline_access openid profile"
      + `&password=${password}`
      + `&username=${username}`
      + "&credentials=true"
      + "&resource=api://enterprise";

    return this.http.post('https://cors-anywhere.herokuapp.com/id.pe.atelierclient.com/connect/token', credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'Accept',
        'Accept': 'application/json',
      })
    })
  }

  getRequest(token: string): Observable<any> {
    return this.http.get('https://pe.atelierclient.com/api/home/auth-ping', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    })
  }
}
