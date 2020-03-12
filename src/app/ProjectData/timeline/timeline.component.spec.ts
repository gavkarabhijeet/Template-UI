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
import { TimelineComponent } from './timeline.component';

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineComponent ],
      imports: [HttpClientModule,RouterModule, RouterTestingModule,
         NgbModule, NgxPaginationModule, FormsModule, ReactiveFormsModule, BrowserModule,]
    
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
