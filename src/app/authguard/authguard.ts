import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log(localStorage.getItem('username'));
        if (localStorage.getItem('username') || localStorage.getItem('role')) {
    console.log("!!!!!!!!!!!!!  Inside AUTHGUARD TRUE    !!!!!!!!!!!!!!!!!")
            // logged in so return true
            return true;
        }
        else {
console.log("!!!!!!!!!!!!!  Inside AUTHGUARD FALSE    !!!!!!!!!!!!!!!!!")
        // not logged in so redirect to login page with the return url
        this.router.navigate([''], { queryParams: { returnUrl: state.url }});
        return false;
        }
    }
}