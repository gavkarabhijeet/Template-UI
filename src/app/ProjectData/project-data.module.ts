import { IbmConnectComponent } from './ibm-connect/ibm-connect.component';
import { MappingComponent } from './mapping/mapping.component';
import { MasterSequenceComponent } from './master-sequence/master-sequence.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { SequenceDiagramComponent } from './sequence-diagram/sequence-diagram.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectDataRoutingModule } from './project-data.routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductDataComponent } from './product-data/product-data.component';
import { ServicesComponent } from './services/services.component';
import { ApiValidatorComponent } from './api-validator/api-validator.component';
import { TimelineComponent } from './timeline/timeline.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProjectManagementService } from './project-management/project-management.service';
import { ServicesService } from './services/services.component.service';
import { ProductsService } from './product-data/product-data.component.service'
import { SequenceDiagramService } from './sequence-diagram/sequence-diagram.service';
import { mappingService } from './mapping/mapping.service'
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import {UserListComponent} from './user-list/user-list.component';
import {UserListService} from './user-list/user-list.service';
import {FirstTimePasswordChangeComponent} from './first-time-password-change/first-time-password-change.component';
import {FirstTimePasswordChangeService } from './first-time-password-change/first-time-password-change.service';
import { CheckerComponent } from './checker/checker.component'
import { MakerComponent } from './maker/maker.component'


@NgModule({
    declarations: [IbmConnectComponent, MappingComponent, MasterSequenceComponent
        , ProjectManagementComponent, SequenceDiagramComponent, ProductDataComponent
        , ServicesComponent ,  ApiValidatorComponent, TimelineComponent,
        UserListComponent,FirstTimePasswordChangeComponent, CheckerComponent, MakerComponent ],
       
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        ProjectDataRoutingModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        NgxPaginationModule,
        Ng2SmartTableModule,
        ToastrModule.forRoot(),
    ],
  
    entryComponents: [ProjectManagementComponent],
    providers: [ProjectManagementService, ServicesService,FirstTimePasswordChangeService , mappingService,
         ProductsService, SequenceDiagramService,UserListService]

})

export class ProjectDataModule { }
