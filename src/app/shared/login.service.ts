import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from './store';
import { User } from './user.model';
import { Observable } from 'rxjs/Observable';
import {
  START_SIGNIN,
  END_SIGNIN

} from './operation.reducer';

@Injectable()
export class LoginService {
  title = 'Angular 2';
  private API_PATH: string = 'http://localhost:3000/users';
  user: User;
  errorMessage: string;
  //
  constructor(private http: Http, private store: Store<AppState>) { }

  getUser_bk(): Promise<User> {
    if (this.user) {
      return Promise.resolve(this.user);
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        this.user = new User("admin", "password");
        resolve(this.user);
      }, 1000);
    });
  }


  authenticate_bk(username, password): void {

    this.store.dispatch({
      type: START_SIGNIN
    });

    this.getUser_bk().then(//
      user => {
        console.log(password);
        console.log(user.password);
        console.log(username);

        if (password === user.password) {
          this.store.dispatch({
            type: END_SIGNIN,
            payload: user
          });
        }
      }
    )
  }

  authenticate(username, password): void {

    this.getUser().subscribe(user => {
      this.user = user;
      console.log("User" + user);
      console.log(password);
      console.log(this.user.password);
      console.log(username);

      if (password === user.password) {
        this.store.dispatch({
          type: END_SIGNIN,
          payload: user
        });
      }
    })
  }

  getUser(): Observable<User> {
    return this.http.get(`${this.API_PATH}?`)
      .map(this.extractData)
      .catch(this.handleError);      
  }

  private extractData(res: Response) {
    console.log(res);
    let body = res.json();
    console.log(body);    
    return body[0] || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


  // this.http.get(`${this.API_PATH}?`)
  //   .map(res => res.json() || []).toPromise().then(user => {
  //     console.log(password);
  //     console.log(user.password);
  //     console.log(username);

  //     if (password === user.password) {
  //       this.store.dispatch({
  //         type: END_SIGNIN,
  //         payload: user
  //       });
  //     }
  //   })

}



