import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Routes } from '@angular/router';
import { ProjectManagementServiceStub } from './project-management.service.stub';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';



describe('ProjectManagementServiceStub', () => {
    let service: ProjectManagementServiceStub;
    let httpMock: HttpTestingController;
    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                ProjectManagementServiceStub],

            imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule, RouterModule, NgbModule, NgxPaginationModule, FormsModule, ReactiveFormsModule, BrowserModule,]
            ,
        })

        service = TestBed.get(ProjectManagementServiceStub);
        httpMock = TestBed.get(HttpTestingController);
    })


    it("should be initialized ", inject([ProjectManagementServiceStub], (service1: ProjectManagementServiceStub) => {
        expect(service1).toBeTruthy();
    }));

    it("should fetch data asynchronously",
        fakeAsync(
            inject(
                [ProjectManagementServiceStub, HttpTestingController],
                (service1: ProjectManagementServiceStub, backend: HttpTestingController) => {
                    const url = "http://192.168.5.140:3002/api/project/";
                    const responseObject: any[] = [{
                        projectId: "ID123",
                        name: 'Project1'
                    }]
                    let response = null;

                    service1.getProject().subscribe(
                        (receivedResponse: any) => {
                            response = receivedResponse;
                            console.log("Response = ", response)


                            expect(response).toEqual(responseObject);
                            expect(receivedResponse.length).toBe(1);
                        },
                        (error: any) => { }
                    );

                    const requestWrapper = backend.expectOne({ url: "http://192.168.5.140:3002/api/project/" });


                    expect(requestWrapper.request.method).toEqual('GET');
                    expect(requestWrapper.cancelled).toBeFalsy();

                    requestWrapper.flush(responseObject)

                }
            )
        ))

    afterEach(() => {
        httpMock.verify();
    });


    it('should post the correct data ', () => {

        service.createProject({ 'projectName': 'abc', "version": 123 }).subscribe((data: any) => {
            expect(data.projectName).toBe('abc');
        })

        const req = httpMock.expectOne('http://192.168.5.140:3002/api/project/', 'post to api');

        expect(req.request.method).toBe('POST');

        req.flush({ 'projectName': 'abc', "version": 123 })

        httpMock.verify();
    });


    it('should put the correct data',()=>{
        service.updateProject({ 'projectName': 'abc', "version": 123 }).subscribe((data: any) => {
            expect(data.projectName).toBe('abc');
        })

        const req = httpMock.expectOne('http://192.168.5.140:3002/api/project/', 'post to api');

        expect(req.request.method).toBe('PUT');

        req.flush({ 'projectName': 'abc', "version": 123 })

        httpMock.verify();
    });


    it('should delete the correct data ', () =>{
       
        service.deleteProject( 'ProjectID1566882299092').subscribe((data:any)=>{
            expect(data).toBe('ProjectID1566882299092')
        })

        var url = 'http://192.168.5.140:3002/api/project/?projectId='
      
        const  req = httpMock.expectOne(url+ 'ProjectID1566882299092')
        console.log("req.request.url = ", req.request.url);
        console.log("req.request.method = ", req.request.method);
        expect(req.request.url.endsWith("/?projectId=ProjectID1566882299092")).toEqual(true);
        expect(req.request.method).toBe('DELETE');
        req.flush( 'ProjectID1566882299092');

        httpMock.verify();

    })


});