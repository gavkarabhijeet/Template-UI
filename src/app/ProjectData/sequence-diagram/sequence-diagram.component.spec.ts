import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { SequenceDiagramComponent } from './sequence-diagram.component';
import { SequenceDiagramService } from './sequence-diagram.service';
import { NgxSpinnerService } from 'ngx-spinner';

describe('SequenceDiagramComponent', () => {
  let component: SequenceDiagramComponent;
  let fixture: ComponentFixture<SequenceDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenceDiagramComponent ],
      imports: [HttpClientModule, RouterTestingModule, NgbModule, NgxPaginationModule, FormsModule, ReactiveFormsModule, BrowserModule,],
      providers: [{ provide: SequenceDiagramService, useClass: SequenceDiagramService ,ngxSpinner:NgxSpinnerService}
               ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(SequenceDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
