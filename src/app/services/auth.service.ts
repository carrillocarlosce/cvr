import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap, first, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<User>;
  constructor(
    public afAuth: AngularFireAuth, 
    public afs: AngularFirestore) {
    //// Get auth data, then get firestore user document || null
  }

  async login() {
    let credentials = await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    let user = await this.checkUser(credentials.user);
    if(!user) {
      await this.updateUserData(credentials.user);
      console.log('user profile have been saved');
    }
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  async checkUser(user) {
    return this.afs.doc(`users/${user.uid}`)
    .valueChanges()
    .pipe(
      first()
    ).toPromise();
  }

  async updateUserData(user) {
    let userData = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL || 'http://via.placeholder.com/100x100',
      displayName: user.displayName || 'Usuario Nuevo'
    }
    return this.afs.doc(`users/${user.uid}`).set(
      userData, {merge: true}
    )
  }
}
