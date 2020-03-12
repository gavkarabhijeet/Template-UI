import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { Observable } from "rxjs";

const baseUrl: string = config.url;
@Injectable({ providedIn: "root" })

export class MyProfileService {
    
    constructor(private http: HttpClient) { }
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
    /**
 * @author Khetaram
 * @description This method will update data in the project details
 */

updateProjectData(data):Promise<any> {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
    console.log("data",data);
    return new Promise((resolve,reject)=>{
        this.http.put(baseUrl + "project",data,{headers:headers_object})
        .pipe(map(Response => Response))
        .subscribe((res:any)=>{
            console.log("Update response from app server -> ",res);
            resolve(res);
        },reject);

    })

}
/**
 * @author Sanchita
 * @description This function will call the service to get the project details
 */
getApp(projectId):Promise<any> {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
    return new Promise((resolve,reject)=>{
        this.http.get(baseUrl + "project/?projectId="+projectId,{headers:headers_object})
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
getProductById(productId):Promise<any>{
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
   
    return new Promise((resolve,reject)=>{
        this.http.get(baseUrl + "product/?productId="+productId,{headers:headers_object})
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}
getServiceById(serviceId):Promise<any>{
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
    return new Promise((resolve,reject)=>{
        this.http.get(baseUrl + "service/?serviceId="+serviceId,{headers:headers_object})
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}
getAuditTrailByProjectId(projectId):Promise<any>{
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
    return new Promise((resolve,reject)=>{
        this.http.get(baseUrl + "project/getAudit?projectId="+projectId,{headers:headers_object})
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            console.log("PRINT : GET AUDIT TRAIL RESPONSE",response)
            resolve(response);
        }, reject);
    })
}
putProjectData(data):Promise<any>{
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
    return new Promise((resolve,reject)=>{
        this.http.put(baseUrl + "project",data,{headers:headers_object})
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
           
            resolve(response);
        }, reject);
    })
}
uploadFile(projectId,file,fileType):Promise<any> {    
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
    return new Promise((resolve,reject)=>{
        this.http.post(baseUrl + "file/upload_files?projectId="+projectId+"&type="+fileType,file,{headers:headers_object})
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}
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

}