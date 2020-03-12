import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotfoundComponent } from './404/not-found.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutes } from './authentication.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { LoginService } from './login/login.service'
import { SignupService } from './signup/signup.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ECollectionDataComponent } from './e-collection-data/e-collection-data.component';

import { HomepageComponent } from './homepage/homepage.component';
import { FileUploadModule } from 'ng2-file-upload';
import { AppDetailsComponent } from './app-details/app-details.component';

import { LandingService } from './landing-page/landing-page.service';
import { ECollectionService } from './e-collection-data/e-collection-data.service';

import { ProductPageComponent } from './product-page/product-page.component';
import { ProductPageService } from './product-page/product-page.service';
import { HomePageService } from './homepage/homepage.service';
import { AppDetailsService } from './app-details/app-details.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CatalogComponent } from './catalog/catalog.component';
import { ProfileComponent } from './profile/profile.component';
import {MyProfileService} from './profile/profile.service';
import { MappingComponent } from './mapping/mapping.component';
import { mappingService } from './mapping/mapping.service';
import { MakerPageComponent } from './maker-page/maker-page.component';
import {MakerService} from './maker-page/maker-page.service';
import { AppStatusComponent } from './app-status/app-status.component';
import { AppStatusService } from './app-status/app-status.service';
import { MakerDetailsComponent } from './maker-details/maker-details.component';
import {MakerDetailsService } from './maker-details/maker-details.service';
import { UserAppDetailsComponent } from './user-app-details/user-app-details.component';
import { CheckerDetailsService } from "./checker-page/checker-details.service"; 

import { Mapping7Component } from './mapping7/mapping7.component';
import { Mapping4Component } from './mapping4/mapping4.component';
import { Mapping3Component } from './mapping3/mapping3.component';
import { Mapping2Component } from './mapping2/mapping2.component';
import { IsurePayMappingComponent } from './isure-pay-mapping/isure-pay-mapping.component';
import { IsurepayMapping2Component } from './isurepay-mapping2/isurepay-mapping2.component';
import { Mapping5Component } from './mapping5/mapping5.component';
import { Mapping6Component } from './mapping6/mapping6.component';
import { CheckerPageComponent } from './checker-page/checker-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CmsComponentComponent } from './cms-component/cms-component.component';
import {CMSComponentService} from './cms-component/cms-component.service';
import {MakerDetailsPageService} from './maker-details-page/maker-details-page.service';
import { MakerDetailsPageComponent } from './maker-details-page/maker-details-page.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AuthGuard } from './auth.guard';
import { GoLiveTabComponent } from './go-live-tab/go-live-tab.component';
import { NewMappingComponent } from './new-mapping/new-mapping.component';
import { newMappingService } from './new-mapping/new-mapping.service';
import {NewHomepageComponent} from './NewHomePage/newHomepage.component';
import {ApplicationComponent} from './application/application.component';
import {ApplicationDetailsService} from './application/application.service'
import {ProductComponent} from './product/product.component';
import{OrganizationComponent} from './organization/organization.component';
import { from } from 'rxjs';
import { NgTerminalModule } from 'ng-terminal';

/**
   * @author Sanchita 
   * @description Components and modules imported for authentication folder 
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
    NgTerminalModule,
    
    NgxPaginationModule
  ],
  declarations: [
    NotfoundComponent,
    LoginComponent,
    SignupComponent,
    LandingPageComponent,
    ECollectionDataComponent,
    AppDetailsComponent,
    ProductPageComponent,
    HomepageComponent,
    CatalogComponent,
    ProfileComponent,
    MappingComponent,
    MakerPageComponent,
    AppStatusComponent,
    MakerDetailsComponent,
    UserAppDetailsComponent,
    Mapping7Component,
    Mapping4Component,
    Mapping3Component,
    Mapping2Component,
    IsurePayMappingComponent,
    IsurepayMapping2Component,
    Mapping5Component,
    Mapping6Component,
    CheckerPageComponent,
    UserProfileComponent,
    ResetPasswordComponent,
    CmsComponentComponent,
    MakerDetailsPageComponent,
    GoLiveTabComponent,
    NewMappingComponent,
    NewHomepageComponent,
    ApplicationComponent,
    ProductComponent,
    OrganizationComponent


  ],
  providers: [
    newMappingService,MyProfileService,MakerDetailsService ,MakerService, AppDetailsService, ProductPageService, LoginService, SignupService, LandingService, ECollectionService, HomePageService, mappingService,
    AppStatusService,CheckerDetailsService,CMSComponentService,MakerDetailsPageService,AuthGuard,ApplicationDetailsService
  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthenticationModule { }
