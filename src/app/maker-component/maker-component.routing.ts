import { Routes } from '@angular/router';
import { MakerComponentComponent } from './maker-component/maker-component.component';
/**
   * @author Kuldeep 
   * @description Routinng Defined for changePassword
   */
export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
        {
            path: 'home',
            component: MakerComponentComponent
          }
    ]
  }
];
