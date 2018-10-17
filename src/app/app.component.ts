import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreService } from './services/firestore.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
  ];

  public loggedOutPages = [
    {
      title: 'Iniciar Sesión',
      url: '/login',
      icon: 'contact'
    }
  ];
  
  public user: Observable<any>;
  public logged: Observable<any>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public afAuth: AngularFireAuth,
    public firestore: FirestoreService 
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.user = this.afAuth.authState.pipe(
        switchMap(user => {
            console.log(user)
            if(user) {
              return this.firestore.getDocument(`users/${user.uid}`).valueChanges();
            } else {
              return of(null);
            }
        })
      )
    });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    console.log('Succesfully Sign Out');
  }
}