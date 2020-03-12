import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsComponentComponent } from './cms-component/cms-component.component';
import { CmsComponentService } from './cms-component/cms-component.service';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthenticationRoutes } from './cms-component.routing';
@NgModule({
  declarations: [CmsComponentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [
    CmsComponentService
  ]
})
export class CmsComponentModule { }
