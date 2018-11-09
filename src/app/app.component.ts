import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './core/auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Mis Archivos',
      url: '/directory',
      icon: 'folder',
      logged: true,
    },
    {
      title: 'Iniciar Sesión',
      url: '/login',
      icon: 'contact',
      logged: false
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public auth: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  get user(): Observable<any|null> {
    return this.auth.user;
  }

  get loggedOutPages() {
    return this.appPages.filter(x => !x.logged);
  }

  get loggedInPages() {
    return this.appPages.filter(x => x.logged);
  }

  logOut(): void {
    return this.auth.signOut();
  }
}