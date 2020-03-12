import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
const baseUrl: string = config.url;

@Injectable()
export class CheckerDetailsService {
  
    constructor(private http: HttpClient) { }

    getProjectDetails(projectId):Promise<any>{
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
        return new Promise((resolve,reject)=>{
            this.http.get(baseUrl + "project/?projectId="+ projectId,{headers:headers_object})
            .pipe(map(Response => Response))
    
            .subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }
    updateProjectData(data):Promise<any> {
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
        return new Promise((resolve,reject)=>{
            this.http.put(baseUrl + "project",data,{headers:headers_object})
            .pipe(map(Response => Response))
            .subscribe((res:any)=>{
                console.log("Update response from app server -> ",res);
                resolve(res);
            },reject);
    
        })
    
    }
    getProductDetails(productId):Promise<any>{
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
        return new Promise((resolve,reject)=>{
        this.http.get(baseUrl + "product/?productId="+ productId,{headers:headers_object})
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}
getUserDetails():Promise<any>{
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
    return new Promise((resolve,reject)=>{
        this.http.get(baseUrl + "user",{headers:headers_object})
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}

getServiceDetails(serviceId):Promise<any>{
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
    return new Promise((resolve,reject)=>{
        this.http.get(baseUrl + "service/?serviceId="+ serviceId,{headers:headers_object})
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}
getUser(username):Promise<any>{
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
    return new Promise((resolve,reject)=>{
        this.http.get(baseUrl + "user/?username="+ username)
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}
approveUser(data):Promise<any>{
    return new Promise((resolve,reject)=>{
        console.log(data);
        this.http.post(baseUrl + "user/approveByMaker", data)
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}
/**
     * @author Kuldeep 
     * @description This function is used to logout the user 
     */
    logout(userData):Promise<any> {
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
        return new Promise((resolve,reject)=>{
            this.http.post(baseUrl + "user/logout",userData,{headers:headers_object})
            .pipe(map(Response => Response))
  
            .subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }
}













