import { Routes } from '@angular/router';
import { CreateAppComponent } from './create-app/create-app.component';
/**
   * @author Sanchita 
   * @description Routinng Defined for signUp login
   */
export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'createApp',
        component: CreateAppComponent
      }
    ]
  }
];
