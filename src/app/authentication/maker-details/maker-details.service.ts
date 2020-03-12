import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { query } from '@angular/core/src/render3';
const baseUrl: string = config.url;

@Injectable()
export class MakerDetailsService {
  
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
getUserDetails(username):Promise<any>{
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
          console.log("username",username);
    return new Promise((resolve,reject)=>{
        this.http.get(baseUrl + "users/?username="+username,{headers:headers_object})
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
        this.http.get(baseUrl + "user/?username="+ username,{headers:headers_object})
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}
approveUser(data):Promise<any>{
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
    return new Promise((resolve,reject)=>{
        console.log("response from aprrove User ",data);
        this.http.post(baseUrl + "user/approveByMaker", data,{headers:headers_object})
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}
updateProjectName(data):Promise<any>{
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
    console.log("headerObject",headers_object);
    return new Promise((resolve,reject)=>{
        console.log("--------->",data);
        this.http.put(baseUrl +"project/updateProject",data,{headers:headers_object})
        .pipe(map(Response => Response))
        .subscribe((response:any)=>{
            resolve(response);
        },reject);
    })
}

//client code validator

checkClientCode(data):Promise<any>{
    console.log("data",data)
    var query: any;
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
    console.log("headerObject",headers_object);
    if(data.type=="ips"){
        query = "clientCodeIPS="+data.clientCode
    }else if(data.type == "icore"){
        query = "iCoreClientCode="+data.clientCode
    }else{
        query = "clientCodeProfund="+data.clientCode
    }
    
    return new Promise((resolve,reject)=>{
        this.http.get(baseUrl +"user/checkClientCode?"+query,{headers:headers_object})
        .pipe(map(Response => Response))
        .subscribe((response:any)=>{
            resolve(response);
        },reject);
    })
}
}
















