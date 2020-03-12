import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { MappingComponent } from './mapping.component';
import { mappingService } from './mapping.service'
import { NgxSpinnerModule } from 'ngx-spinner';

describe('MappingComponent', () => {
  let component: MappingComponent;
  let fixture: ComponentFixture<MappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingComponent ],
      imports: [  HttpClientModule,RouterModule, RouterTestingModule, NgbModule, NgxSpinnerModule,
                  NgxPaginationModule, FormsModule, ReactiveFormsModule, BrowserModule,],
       providers: [ mappingService ]
                  
                          
    
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
