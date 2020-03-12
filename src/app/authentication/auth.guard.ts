import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(localStorage.getItem('username'));
    if (localStorage.getItem('username') || localStorage.getItem('roles')) {
      console.log("!!!!!!!!!!!!!  Inside AUTHGUARD TRUE    !!!!!!!!!!!!!!!!!")
      // logged in so return true
      return true;
    }
    else {
      console.log("!!!!!!!!!!!!!  Inside AUTHGUARD FALSE    !!!!!!!!!!!!!!!!!")
      // not logged in so redirect to login page with the return url , { queryParams: { returnUrl: state.url } }
      this.router.navigate(['authentication/login']);
      return false;
    }
  }
}
