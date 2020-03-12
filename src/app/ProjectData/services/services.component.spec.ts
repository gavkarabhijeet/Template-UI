import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ServicesService } from './services.component.service';
import { ServicesComponent } from './services.component';

describe('ServicesComponent', () => {
  let component: ServicesComponent;
  let fixture: ComponentFixture<ServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesComponent ],
      imports: [HttpClientModule, RouterModule, RouterTestingModule, NgbModule, NgxPaginationModule, FormsModule, ReactiveFormsModule, BrowserModule,],
      providers: [{ provide: ServicesService, useClass: ServicesService }
               ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(ServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
