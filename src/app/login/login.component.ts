import { Component } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../shared/store';

@Component({
  selector: 'login',
  template: require('./login.html'),
  styles: [`
    md-card-title,
    md-card-content {
      display: flex;
      justify-content: center;
    }

    md-input {
      width: 300px;
    }

    md-card-spinner {
      padding-left: 60px; // Make room for the spinner
    }

    md-spinner {
      width: 30px;
      height: 30px;
      position: relative;
      top: 10px;
      left: 10px;
      opacity: 0.0;
    }

    md-spinner.show {
      opacity: 1.0;
    }
  `]
})
export class LoginComponent {
  credentials: User = new User("", "");

  signInSubscription: Subscription;
  signedIn: boolean = false;
  user: User = new User("", "");
  errorMessage: string;

  constructor(private service: LoginService, private router: Router, private store: Store<AppState>) {
    this.service = service;
    this.router = router;
    this.store = store;

  }

  ngOnInit() {
    this.signInSubscription = this.store.select(x => x.operation.endSignIn)
      .subscribe(flag => {
        this.signedIn = flag;
        if (this.signedIn == true) {
          this.router.navigate(['/students/slist']);
        }
      });
  }

  authenticate(username, password) {
    console.log("in service!!!" + username + password);
    this.service.authenticate(username, password);
  }
}