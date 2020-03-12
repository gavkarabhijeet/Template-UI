import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthGuard } from './authguard/index';
/**
 * @author Sanchita
 * @description routing defined for signUp login and changePassword
 */
export const Approutes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      { path: '', redirectTo: '/authentication/Home', pathMatch: 'full' },

      {
        path: 'authentication',
        loadChildren:
          './authentication/authentication.module#AuthenticationModule'
      },
      {
        path: 'change-password',
        loadChildren:
          './change-password/change-password.module#ChangePasswordModule',
          canActivate: [AuthGuard]
      },
      {
        path: 'create-app',
        loadChildren:
          './create-app/create-app.module#CreateAppModule',
          canActivate: [AuthGuard]
      },
      {
        path: 'cms',
        loadChildren:
          './cms-component/cms-component.module#CmsComponentModule',
          canActivate: [AuthGuard]
      },
      {
        path: 'maker',
        loadChildren:
          './maker-component/maker-component.module#MakerComponentModule',
          canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'ProjectData',
        loadChildren: './ProjectData/project-data.module#ProjectDataModule',
        
      },    
    ]
  },
  {
    path: '**',
    redirectTo: '/authentication/404'
  }
];
