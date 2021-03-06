import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selected = 'option2';
  title = 'AppDomain';
  isAuthenticated: boolean;

  widget = new OktaSignIn({
    baseUrl: 'https://dev-930356.okta.com'
  });

  constructor(public oktaAuth: OktaAuthService, private router: Router) {

    this.widget.renderEl({
      el: '#okta-signin-container'
    },
      (res) => {
        if (res.status === 'SUCCESS') {
          this.oktaAuth.loginRedirect('/', { sessionToken: res.session.token });
          // Hide the widget
          this.widget.hide();
        }
      },
      (err) => {
        throw err;
      }
    );
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }

  // tslint:disable-next-line:use-lifecycle-interface
  async ngOnInit() {
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  login() {
    this.oktaAuth.loginRedirect('/');
  }

  profile(){
    this.router.navigateByUrl("/profile");

  }

  logout() {
    this.oktaAuth.logout('/');
  }

 
}
