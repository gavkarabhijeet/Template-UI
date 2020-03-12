import { Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
/**
   * @author Kuldeep 
   * @description Routinng Defined for changePassword
   */
export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
        {
            path: 'changePassword',
            component: ChangePasswordComponent
          }
    ]
  }
];
