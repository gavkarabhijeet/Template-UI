import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
const baseUrl: string = config.url;

@Injectable()
export class MakerDetailsPageService {
    results = [];
    constructor(private http: HttpClient) { }
/**
 * @author Sanchita
 * @description This function will get all the details of user
 */
       getUserDetails():Promise<any>{
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
        return new Promise((resolve,reject)=>{
                this.http.get(baseUrl + "user/",{headers:headers_object})
                .pipe(map(Response => Response))
        
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
            })
        }

        /**
         * @author Sanchita
         * @description This function will get the details of not approved user
         */
        getDetailsOfNotApproved():Promise<any>{
            var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
       return new Promise((resolve,reject)=>{
                this.http.get(baseUrl + "user/?makerApproval=false",{headers:headers_object})
                .pipe(map(Response => Response))
        
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
            })
        }



     /**
         * @author Sanchita
         * @description This function will get the details of  approved user
         */
        getDetailsOfApproved():Promise<any>{
            var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
            return new Promise((resolve,reject)=>{
                this.http.get(baseUrl + "user/?makerApproval='true'",{headers:headers_object})
                .pipe(map(Response => Response))
        
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
            })
        }

        getProjectbyId(projectId):Promise<any>{
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
}