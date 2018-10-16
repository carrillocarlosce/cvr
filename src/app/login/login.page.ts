import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user: Observable<any>;
  constructor(public auth: AuthService) {
    
  }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.auth.login();
  }
}
