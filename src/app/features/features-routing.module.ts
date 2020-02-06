import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeaturesComponent } from './features.component';
import { AuthGuardService } from '../shareds/guards/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Home',
        component: FeaturesComponent, data: { step: 1 }
      },
      {
        path: 'SalesSheet',
        component: FeaturesComponent, data: { step: 2 }, canActivate: [AuthGuardService]
      },
      {
        path: 'Conditions',
        component: FeaturesComponent, data: { step: 3 }, canActivate: [AuthGuardService]
      },
      {
        path: 'Step',
        component: FeaturesComponent, data: { step: 4 }, canActivate: [AuthGuardService]
      },
      {
        path: 'IDCard',
        component: FeaturesComponent, data: { step: 5 }, canActivate: [AuthGuardService]
      },
      {
        path: 'PersonalInfo',
        component: FeaturesComponent, data: { step: 6 }, canActivate: [AuthGuardService]
      },
      {
        path: 'Confirmation',
        component: FeaturesComponent, data: { step: 7 }, canActivate: [AuthGuardService]
      },
      {
        path: 'Confirmation-question',
        component: FeaturesComponent, data: { step: 8 }, canActivate: [AuthGuardService]
      },
      {
        path: 'ConsentInfo',
        component: FeaturesComponent, data: { step: 9 }, canActivate: [AuthGuardService]
      },
      {
        path: 'InterestRate',
        component: FeaturesComponent, data: { step: 10 }, canActivate: [AuthGuardService]
      },
      {
        path: 'SummaryDetail',
        component: FeaturesComponent, data: { step: 11 }, canActivate: [AuthGuardService]
      },
      {
        path: 'PaymentChanel',
        component: FeaturesComponent, data: { step: 12 }, canActivate: [AuthGuardService]
      },
      {
        path: 'Complete',
        component: FeaturesComponent, data: { step: 13 }, canActivate: [AuthGuardService]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule { }
