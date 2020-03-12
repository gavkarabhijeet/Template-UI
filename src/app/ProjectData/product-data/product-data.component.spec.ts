import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductDataComponent } from './product-data.component';
import { ProductsService } from './product-data.component.service';
import { ProjectManagementService } from './../project-management/project-management.service'
import { NgxSpinnerModule } from 'ngx-spinner';

describe('ProductDataComponent', () => {
  let component: ProductDataComponent;
  let fixture: ComponentFixture<ProductDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDataComponent ],
      imports: [HttpClientModule,RouterModule,NgxSpinnerModule,
         RouterTestingModule, NgbModule, NgxPaginationModule, FormsModule, ReactiveFormsModule, BrowserModule,],
      providers: [{ provide: ProductsService, useClass: ProductsService },
         { provide : ProjectManagementService , useClass: ProjectManagementService}
               ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it("should use the ProjectList from the service", () => {
  //   console.log("Create a Project Service")
  //   const projectService = fixture.debugElement.injector.get(ProjectManagementService);
  //   fixture.detectChanges();
  //   expect(projectService.getProject()).toEqual(component.getResponse);
  // });

});
