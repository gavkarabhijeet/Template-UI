import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
const baseUrl: string = config.url;

@Injectable()
export class MakerService {
    results = [];
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
                var approval = "true"
                this.http.get(baseUrl + "users/?makerApproval=true",{headers:headers_object})
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
    getProjectbyIdN():Promise<any>{
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
              .set('Cache-Control', 'no-cache')
              .set('Pragma', 'no-cache')
              .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
              .set('If-Modified-Since', '0');
        return new Promise((resolve,reject)=>{
              this.http.get(baseUrl + "project",{headers:headers_object})
              .pipe(map(Response => Response))
      
              .subscribe((response: any) => {
                  resolve(response);
              }, reject);
          })
      }
    MyMethod() {
        var userData = JSON.parse(localStorage.getItem("dataofUser"))
        var baseUrl = window.name
        $.ajax({
            headers: {
                Accept: "text/plain; charset=utf-8",
                "Content-Type": "text/plain; charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            type: "POST",
            url: baseUrl + "user/logout",
            async: false,
            dataType: 'json',
            data: {
                email: userData[0].email
            },
            success: function (data) {
                localStorage.clear();
            }
        })
    }
}