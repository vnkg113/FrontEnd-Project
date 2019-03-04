import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "../models/user";
import { Observable } from 'rxjs';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  userDetails: firebase.User = null;
  loggedUser;
  dbUser;
  localUser: firebase.User;
  constructor(public afAuth: AngularFireAuth, public router: Router, private userService: UserService) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.localUser = user;
        localStorage.setItem('user', JSON.stringify(this.localUser));
      } else {
        localStorage.setItem('user', null);
      }
    })

    //

    this.user = afAuth.authState;
    this.dbUser = new User();
    this.user.subscribe(user => {
      if (user) {
        this.userDetails = user;
        userService
          .isAdmin(this.userDetails.email)
          .snapshotChanges()
          .subscribe(data => {
            data.forEach(el => {
              const y = el.payload.toJSON();
              this.dbUser = y;
            });
          });
      } else {
        this.userDetails = null;
      }
    });
  }

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
        .signInWithRedirect(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }

  doTwitterLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth.auth
        .signInWithRedirect(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithRedirect(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.auth.currentUser) {
        this.afAuth.auth.signOut()
        localStorage.removeItem('user');
        this.loggedUser = null;
        resolve();
      }
      else {
        reject();
      }
    });
  }
  get isLoggedIn(): boolean {
    if (this.userDetails !== null) {
      return true;
    }
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }
  isAdmin(): boolean {
    const user = this.getLoggedInUser();
    // console.log("loggedUSer", user)
    if (user != null) {
      if (user.isAdmin === true) {
        return true;
      }
    }
  }
  getLoggedInUser(): User {
    const loggedUser: User = new User();
    const user = this.afAuth.auth.currentUser;

    if (user) {
      this.userDetails = user;
      if (user != null) {
        loggedUser.$key = user.uid;
        loggedUser.userName = user.displayName;
        loggedUser.emailId = user.email;
        loggedUser.phoneNumber = user.phoneNumber;
        loggedUser.avatar = user.photoURL;
        // loggedUser.isAdmin = this.dbUser["isAdmin"];
        loggedUser.isAdmin = true;
      }
    } else {
      this.userDetails = null;
    }

    return loggedUser;
  }
}
