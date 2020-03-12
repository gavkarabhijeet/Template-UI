import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FileUploadModule } from 'ng2-file-upload';

import { NgxSpinnerModule } from 'ngx-spinner';
import { CreateAppComponent } from './create-app/create-app.component';
import { AuthenticationRoutes } from './create-aap.routing';
/**
   * @author Kuldeep 
   * @description Components and modules imported for create app folder 
   */
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
  CreateAppComponent],
  providers: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateAppModule { }
