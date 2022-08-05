import { Inject, Injectable, InjectionToken, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { filter, map, tap } from "rxjs/operators";

import { User } from "../models/user";
import { ReportService } from "./report.service";

export const ANONYMOUS_USER: User = new User();

export const GIGYA_CIAM = new InjectionToken("gigya ciam");

@Injectable()
export class AuthService {
  user: User;

  private subject = new BehaviorSubject<User>(ANONYMOUS_USER);

  user$: Observable<User> = this.subject.pipe(
    tap((user) => {
      console.log(`changed!`, user);
      this.user = user;
    }),
    filter<User>(Boolean)
  );

  isLoggedIn$: Observable<boolean> = this.user$.pipe(
    map((user) => !!user.$key),
    tap(isLoggedIn => {
      if (isLoggedIn) {
        console.log(`logged in!`)
      }
    })
  );

  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(
    map((isLoggedIn) => !isLoggedIn),
    tap(isLoggedOut => {
      if (isLoggedOut) {
        console.log(`logged out!`)
      }
    })
  );

  isAdmin$: Observable<boolean> = this.user$.pipe(
    map((user) => !!user.isAdmin)
  );

  constructor(private router: Router, private zone: NgZone) {
    this.refresh();
  }

  async refresh() {}

  logout() {}

  showRegistrationLogin() {}

  createUserWithEmailAndPassword(emailID: string, password: string) {}

  signInRegular(email: string, password: string) {}

  signInWithGoogle() {}
}
