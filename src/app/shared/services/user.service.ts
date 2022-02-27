import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
/////////////
// Interfaces
////////////
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  /////////////
  // Atributes
  ////////////

  public newUser$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private apiURL = 'https://jsonplaceholder.typicode.com';

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  ////////////////////////
  // Methods and funtions
  ///////////////////////
  public get getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiURL}/posts/`);
  }

  public createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(
      `${this.apiURL}/posts/`,
      JSON.stringify(user),
      this.httpOptions
    );
  }

  public findUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiURL}/posts/${id}`);
  }

  public updateUser(id: number, user: User): Observable<User> {
   if (this.newUser$.getValue().length != 0) {
     
     let updateEmploye: any; 
     updateEmploye = this.newUser$.getValue();
     updateEmploye[id] = user; 
     this.newUser$.next(updateEmploye);
   }
    return this.httpClient.put<User>(
      `${this.apiURL}/posts/${id}`,
      JSON.stringify(user),
      this.httpOptions
    );
  }

  public deleteUser(id: number) {
    return this.httpClient.delete<User>(
      `${this.apiURL}/posts/${id}`,
      this.httpOptions
    );
  }
}
