import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//Dependecy Injection - Services
import { AuthService } from "./shared/services/auth/auth.service";
import { LocService } from "./shared/services/loc/loc.service";

//Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LocationsComponent } from './components/locations/locations.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule, PERSISTENCE } from '@angular/fire/compat/auth';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MapComponent } from './components/map/map.component';
import { CreateLocationComponent } from './components/location-create/location-create.component';
import { LocationDetailsComponent } from './components/location-details/location-details.component';
import { ReviewComponent } from './components/review/review.component';
import { LocationEditComponent } from './components/location-edit/location-edit.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ReviewService } from './shared/services/review/review.service';
import { LocationAddImagesComponent } from './components/location-add-images/location-add-images.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    LocationsComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    UserProfileComponent,
    MapComponent,
    CreateLocationComponent,
    LocationDetailsComponent,
    ReviewComponent,
    LocationEditComponent,
    UnauthorizedComponent,
    LocationAddImagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    NgbModule,
    LeafletModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [
    { provide: PERSISTENCE, useValue: 'local' }, //choose between local, session or none
    AuthService,
    LocService,
    ReviewService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
