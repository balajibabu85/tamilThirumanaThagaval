// src/app/login.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';

@Component({
  selector: 'app-secure',
  template: `
    <!-- Container to inject the Sign-In Widget -->
    <div id="okta-signin-container"></div>
  `
})
export class LoginComponent {
  signInVar: any;
  widget = new OktaSignIn({
    baseUrl: 'https://dev-930356.okta.com/',
    authParams: {
      pkce: true
    },
    features:{
      registration: true
    }
  });

  constructor(oktaAuth: OktaAuthService, router: Router) {
    this.signInVar = oktaAuth;

    // Show the widget when prompted, otherwise remove it from the DOM.
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        switch (event.url) {
          case '/login':
            break;
          case '/protected':
            break;
          default:
            this.widget.remove();
            break;
        }
      }
    });
  }

  ngOnInit() {
    this.widget.renderEl({
      el: '#okta-signin-container'
    },
      (res) => {
        if (res.status === 'SUCCESS') {
          this.signInVar.loginRedirect('/', { sessionToken: res.session.token });
          // Hide the widget
          this.widget.hide();
        }
      },
      (err) => {
        throw err;
      }
    );
    // tslint:disable-next-line: max-line-length
    this.widget.on('afterRender', function(context){document.getElementsByClassName('registration-link')[0].setAttribute('onclick',"location.href='http://website.com/signup'");});
  }
}