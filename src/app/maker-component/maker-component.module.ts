import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakerComponentComponent } from './maker-component/maker-component.component';
import { MakerComponentService } from './maker-component/maker-component.service'
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthenticationRoutes } from './maker-component.routing';
@NgModule({
  declarations: [MakerComponentComponent],
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
    MakerComponentService
  ]
})
export class MakerComponentModule { }
