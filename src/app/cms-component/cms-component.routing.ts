import { Routes } from '@angular/router';
import { CmsComponentComponent } from './cms-component/cms-component.component';
/**
   * @author Kuldeep 
   * @description Routinng Defined for changePassword
   */
export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
        {
            path: 'production',
            component: CmsComponentComponent
          }
    ]
  }
];
