// import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IbmConnectComponent } from './ibm-connect/ibm-connect.component';
import { MappingComponent } from './mapping/mapping.component';
import { MasterSequenceComponent } from './master-sequence/master-sequence.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { SequenceDiagramComponent } from './sequence-diagram/sequence-diagram.component';
import { ProductDataComponent } from './product-data/product-data.component';
import { ServicesComponent } from './services/services.component';
import { ApiValidatorComponent } from './api-validator/api-validator.component';
import { TimelineComponent } from './timeline/timeline.component';
import { UserListComponent } from './user-list/user-list.component';
import { MakerComponent } from './maker/maker.component'
import { CheckerComponent } from './checker/checker.component'
import {FirstTimePasswordChangeComponent} from './first-time-password-change/first-time-password-change.component';


export const ProjectDataRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'IBMConnect',
                component: IbmConnectComponent,
                data: {
                    title: 'IBMConnect',
                    urls: [
                        { title: 'IBMConnect' },
                        { title: 'IBMConnect' }
                    ]
                },
                
            },
            {
                path:'PasswordChange',
                component:FirstTimePasswordChangeComponent
            },
            {
                path:'UserList',
                component:UserListComponent,
                data:{

                }
            
            },
            {
                path: 'MappingData',
                component: MappingComponent,
                data: {
                },
                
            },
            {
                path: 'MasterSequence',
                component:MasterSequenceComponent,
                data: {
                },
                
            },
            {
                path: 'ProjectManagement',
                component:  ProjectManagementComponent,
                data: {
                },
                
            },
            {
                path: 'ProjectsManagement',
                component:  ProjectManagementComponent,
                data: {
                },
                
            },
            {
                path: 'SequenceDiagram',
                component:  SequenceDiagramComponent,
                data: {
                },
                
            },
            {
                path: 'SequencesDiagram',
                component:  SequenceDiagramComponent,
                data: {
                },
                
            },
            {
                path: 'ProductData',
                component:  ProductDataComponent,
                data: {
                },
                
            },
            {
                path: 'ProductsData',
                component:  ProductDataComponent,
                data: {
                },
                
            },
            {
                path: 'ServicesData',
                component:  ServicesComponent,
                data: {
                },
                
            },
            {
                path: 'ServiceData',
                component:  ServicesComponent,
                data: {
                },
                
            },
            {
                path: 'api-validator',
                component:  ApiValidatorComponent,
                data: {
                },
                
            },
            {
                path: 'timeline',
                component:  TimelineComponent,
                data: {
                },
                
            },
            {
                path : 'Maker',
                component: MakerComponent

            },
            {
                path: 'Checker',
                component: CheckerComponent
            }
            
        ]
    }];
    @NgModule({
        imports: [RouterModule.forChild(ProjectDataRoutes)],
        exports: [RouterModule]
      })
      export class ProjectDataRoutingModule {}
      