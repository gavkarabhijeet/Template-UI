import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Routes } from '@angular/router';
import { ProductsServiceStub } from './product-data.component.service.stub';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';




describe('ProductsServiceStub', () => {
    let service: ProductsServiceStub;
    let httpMock: HttpTestingController;
    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                ProductsServiceStub],

            imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule, RouterModule, NgbModule, NgxPaginationModule, FormsModule, ReactiveFormsModule, BrowserModule,]
            ,
        })

        service = TestBed.get(ProductsServiceStub);
        httpMock = TestBed.get(HttpTestingController);
    })


    it("should be initialized ", inject([ProductsServiceStub], (service1: ProductsServiceStub) => {
        expect(service1).toBeTruthy();
    }));

    it("should get data asynchronously",
        fakeAsync(
            inject(
                [ProductsServiceStub, HttpTestingController],
                (service1: ProductsServiceStub, backend: HttpTestingController) => {
                    const url = "http://192.168.2.104 :3002/api/product/";
                    const responseObject: any[] = [{
                        producId: "ID123",
                        name: 'Product1'
                    }]
                    let response = null;

                    service1.getAllProducts().subscribe(
                        (receivedResponse: any) => {
                            response = receivedResponse;
                            console.log("Response = ", response)


                            expect(response).toEqual(responseObject);
                            expect(receivedResponse.length).toBe(1);
                        },
                        (error: any) => { }
                    );

                    const requestWrapper = backend.expectOne({ url: "http://192.168.2.104 :3002/api/product/" });


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

        service.createProduct({ 'productName': 'abc', "version": 123 }).subscribe((data: any) => {
            expect(data.productName).toBe('abc');
        })

        const req = httpMock.expectOne('http://192.168.2.104 :3002/api/product/', 'post to api');

        expect(req.request.method).toBe('POST');

        req.flush({ 'productName': 'abc', "version": 123 })

        httpMock.verify();
    });


    it('should put the correct data',()=>{
        service.updateProduct({ 'productName': 'abc', "version": 123 }).subscribe((data: any) => {
            expect(data.productName).toBe('abc');
        })

        const req = httpMock.expectOne('http://192.168.2.104 :3002/api/product/', 'post to api');

        expect(req.request.method).toBe('PUT');

        req.flush({ 'productName': 'abc', "version": 123 })

        httpMock.verify();
    });


    it('should delete the correct Product data ', () =>{
       
        service.deleteProduct( 'ProductID1566882299092').subscribe((data:any)=>{
            expect(data).toBe('ProductID1566882299092')
        })

        var url = 'http://192.168.2.104 :3002/api/product/?productId='
      
        const  req = httpMock.expectOne(url+ 'ProductID1566882299092')
        console.log("req.request.url = ", req.request.url);
        console.log("req.request.method = ", req.request.method);
        expect(req.request.url.endsWith("/?productId=ProductID1566882299092")).toEqual(true);
        expect(req.request.method).toBe('DELETE');
        req.flush( 'ProductID1566882299092');

        httpMock.verify();

    })


});