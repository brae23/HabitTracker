import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  user$: Subject<User | undefined> = new Subject();

  constructor(private httpClient: HttpClient) {
    this.userLoggedIn$.next(false);
  }

  login(username: string, password: string): Observable<User> {
    let uri = `${environment.baseUrl}/api/auth/login`;
    let body = {
      username: username,
      password: password,
    };
    return this.httpClient.post<User>(uri, body).pipe(
      tap((user) => {
        this.userLoggedIn$.next(true);
        this.user$.next(user);
      }),
    );
  }

  logout(): Observable<boolean> {
    let uri = `${environment.baseUrl}/api/auth/logout`;
    return this.httpClient.post<boolean>(uri, null).pipe(
      tap((_res) => {
        this.userLoggedIn$.next(false);
        this.user$.next(undefined);
      }),
    );
  }

  createUser(
    username: string,
    email: string,
    password: string,
  ): Observable<User> {
    let uri = `${environment.baseUrl}/api/auth/createuser`;
    let body = {
      user_name: username,
      email: email,
      password: password,
    };

    return this.httpClient.post<User>(uri, body).pipe(
      tap((user) => {
        this.userLoggedIn$.next(true);
        this.user$.next(user);
      }),
    );
  }
}
