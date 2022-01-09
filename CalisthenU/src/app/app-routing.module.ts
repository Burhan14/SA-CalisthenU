import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component'
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateLocationComponent } from './components/location-create/location-create.component';
import { LocationDetailsComponent } from './components/location-details/location-details.component';
import { LocationEditComponent } from './components/location-edit/location-edit.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { LocationAddImagesComponent } from './components/location-add-images/location-add-images.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'location-create', component: CreateLocationComponent },
  { path: 'location-details/:id', component: LocationDetailsComponent },
  { path: 'location-edit/:id', component: LocationEditComponent },
  { path: 'location-add-images/:id', component: LocationAddImagesComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }