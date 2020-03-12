import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { Observable } from "rxjs";
import { data } from '../mapping/mapping-table';

const baseUrl: string = config.url;
@Injectable({ providedIn: "root" })
export class UserAppDetailsService {
    dataObj;
    constructor(private http: HttpClient) { }

    /**
     * @author Sanchita
     * @param value 
     * @description function called to register user
     */


    uploadFile(projectId,file):Promise<any> {    
        console.log("file-----",file); 
        return new Promise((resolve,reject)=>{
            this.http.post(baseUrl + "file/upload_files?projectId="+projectId,file)
            .pipe(map(Response => Response))

            .subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }
      /**
     * @author Kuldeep
     * * @param dataForProject
     * @description This function will be used to post the data of app-Details and serviceDetails page of eCollection 
     */
    updateprojectData(dataForProject):Promise<any> {
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
          console.log("data for Project",dataForProject.projectId)
        return new Promise((resolve,reject)=>{
            this.http.put(baseUrl + "project",dataForProject,{headers:headers_object})
            .pipe(map(Response => Response))

            .subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }
    /**
* @author Abhishek
* @param projectId
* @description function called to update uat file
*/

updateFile(projectId,file,fileType):Promise<any> {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
    .set('Cache-Control', 'no-cache')
    .set('Pragma', 'no-cache')
    .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
    .set('If-Modified-Since', '0');
    console.log("fileType",fileType);
    console.log("projectId",projectId);
    return new Promise((resolve,reject)=>{
    
    this.http.put(baseUrl + "file/upload_files?projectId="+projectId+"&type="+fileType,file,{headers:headers_object})
    .pipe(map(Response => Response))
    
    .subscribe((response: any) => {
    resolve(response);
    }, reject);
    })
    }
    
}

