import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpInterceptorProviders } from './htto-interceptors/index';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { AppServiceService } from './services/app-service.service';
import { CommaPipe } from './pipe/comma.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [CommaPipe],
  exports: [CommaPipe],
  providers: [httpInterceptorProviders, AuthenticationService, AuthGuardService, AppServiceService]
})
export class SharedsModule { }
