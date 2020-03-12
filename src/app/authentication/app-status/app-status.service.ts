import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { Observable } from "rxjs";

const baseUrl: string = config.url;
@Injectable({ providedIn: "root" })

export class AppStatusService {

    constructor(private http: HttpClient) { }
    /**
     * @author Sanchita
     * @description This function will call the service to get the project details
     */
    getProjectById(projectId): Promise<any> {
       return new Promise((resolve, reject) => {
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
        this.http.get(baseUrl + "project/Id?projectId=" + projectId,{headers:headers_object})
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        })
    }
    /**
     * @author Sanchita
     * @description This function will call the service to get the product details by id
     */
    getProductById(productId): Promise<any> {
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "product/?productId=" + productId,{headers:headers_object})
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        })
    }
    getServiceById(serviceId): Promise<any> {
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "service/?serviceId=" + serviceId,{headers:headers_object})
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        })
    }
    getAuditTrailById(projectId): Promise<any> {
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
       return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "project/getAudit?projectId=" + projectId,{headers:headers_object})
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        })
    }
    postSitData(data): Promise<any> {
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
       return new Promise((resolve, reject) => {
            this.http.post(baseUrl + "ping", data,{headers:headers_object})
                .pipe(map(Response => Response))

                .subscribe((response: any) => {

                    resolve(response);
                }, reject);
        })
    }
    initiateSIT(data): Promise<any> {
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
        return new Promise((resolve, reject) => {
            this.http.post(baseUrl + "project/initiateSIT",data,{headers:headers_object})
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        })
    }
    initiateUAT(data): Promise<any> {
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
        return new Promise((resolve, reject) => {
            this.http.post(baseUrl + "project/initiateUAT",data,{headers:headers_object})
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        })
    }
    getService(serviceId): Promise<any> {
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "service/?serviceId=" + serviceId,{headers:headers_object})
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /**
     * @author Sanchita
     * @description This function will be used to check the api
     */
    getApiDetails(serviceName, clientCode,reqData): Promise<any> {
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
       return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "ping/?serviceName=" + serviceName + "&clientCode=" + clientCode + "&requestSchema="+ reqData,{headers:headers_object})
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /**
     * @author Sanchita 
     * @description This function will be used for initiating UAT
     */
    postUAT(data): Promise<any> {
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
        return new Promise((resolve, reject) => {
            this.http.post(baseUrl + "project/initiateUAT", data,{headers:headers_object}).pipe(map(Response => Response))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        })
    }
}