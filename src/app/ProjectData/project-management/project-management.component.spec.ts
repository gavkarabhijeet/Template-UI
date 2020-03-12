import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Routes } from '@angular/router';
import { ProjectManagementService } from './project-management.service'
import { ProjectManagementServiceStub } from './project-management.service.stub';
import { ProjectManagementComponent } from './project-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductsService } from './../product-data/product-data.component.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  Http, HttpModule, XHRBackend, ResponseOptions,
  Response, BaseRequestOptions
} from '@angular/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';;


describe('ProjectManagementComponent', () => {
  let comp: ProjectManagementComponent;
  let fixture: ComponentFixture<ProjectManagementComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectManagementComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule, RouterModule, NgbModule, NgxPaginationModule, FormsModule, ReactiveFormsModule, BrowserModule,],
      providers: [{ provide: ProjectManagementService, useClass: ProjectManagementServiceStub },
      { provide: ProductsService, useClass: ProductsService }, {
        provide: HttpClient,Http, useFactory: (backend, options) => {
          return new Http(backend, options);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
        MockBackend,
        BaseRequestOptions,ProjectManagementService
      ]
    }) .compileComponents()
      // .compileComponents().then(() => {
      //   fixture = TestBed.createComponent(ProjectManagementComponent);
      //   comp = fixture.componentInstance;
      //   de = fixture.debugElement.query(By.css('form[id=addProjectCreationData]'))
      //   el = de.nativeElement;
      // });
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProjectManagementComponent);
    comp = fixture.componentInstance;
    // de = fixture.debugElement.query(By.css('form[id=addProjectCreationData]'))
    // el = de.nativeElement;
    fixture.nativeElement.querySelectorAll('button');
  }));

  it('should create component', () => {
    fixture = TestBed.createComponent(ProjectManagementComponent);
    comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

});
