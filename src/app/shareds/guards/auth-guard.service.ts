import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (this._authService.isAuthenticated()) {
    // return false;
    // }

    // navigate to login page
    // this._router.navigate(['/features/Home']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return true;
  }
}
