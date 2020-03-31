import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HotelComponent } from './hotel/hotel.component';
import { ProfileComponent } from './profile/profile.component';
import { OktaAuthModule, OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';
import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './protected/protected.component';


export function onAuthRequired({ oktaAuth, router }) {
  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

// tslint:disable-next-line: whitespace
const routes: Routes = [{path: '', component: HomeComponent},
// tslint:disable-next-line: whitespace
{path:'hotel/:id',component:HotelComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [OktaAuthGuard],
    data: {
      onAuthRequired
    }
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
