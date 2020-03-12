import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutes } from './change-password.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FileUploadModule } from 'ng2-file-upload';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ChangePasswordComponent } from './change-password/change-password.component'
import { ChangePasswordService } from './change-password/change-password.service'
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FileUploadModule,
    NgxSpinnerModule,
    
  ],
  declarations: [
    ChangePasswordComponent
  ],
  providers: [
    ChangePasswordService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChangePasswordModule { }
