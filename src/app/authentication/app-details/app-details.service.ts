import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { Observable } from "rxjs";

const baseUrl: string = config.url;
@Injectable({ providedIn: "root" })

export class AppDetailsService {
    directory: string;
    constructor(private http: HttpClient) { }
    /**
     * @author Sanchita
     * @description This function will be called to get the details of services
     */
    getService(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "service")
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /**
     * @author Sanchita
     * @description This function will be called to get the details of products
     */
    getProducts(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "product")
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /**
     * @author Sanchita 
     * @param registerData
     * @description This function is used to register the user 
     */
    registerData(registerData):Promise<any> {
        return new Promise((resolve,reject)=>{
            this.http.post(baseUrl + "user/register",registerData)
            .pipe(map(Response => Response))

            .subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }
    /**
     * @author Sanchita
     * @param eCollectionProduct
     * @description This function will be used to post the data of app-Details and serviceDetails page of eCollection 
     */
    projectData(dataForProject):Promise<any> {
        
        return new Promise((resolve,reject)=>{
            this.http.post(baseUrl + "project",dataForProject)
            .pipe(map(Response => Response))

            .subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }
    getProjectData():Promise<any> {
        
        return new Promise((resolve,reject)=>{
            this.http.get(baseUrl + "project")
            .pipe(map(Response => Response))

            .subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }
    uploadFile(projectId,file,fileType):Promise<any> {    
        console.log("fileType",fileType);
        return new Promise((resolve,reject)=>{

            this.http.post(baseUrl + "file/upload_files?projectId="+projectId+"&type="+fileType,file)
            .pipe(map(Response => Response))

            .subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }
    uploadFileProd(projectId,file,filetype):Promise<any> {    
        console.log("call of api for prod upload")
        console.log("fileType",filetype);
        return new Promise((resolve,reject)=>{
            this.http.post(baseUrl + "file/upload_files?projectId="+projectId+"&type="+filetype,file)
            .pipe(map(Response => Response))

            .subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }
    uploadFileConfirmation(projectId,file,username,orgName):Promise<any> {    
        console.log("file-----",projectId); 
        // console.log(this.directory);
        this.directory="./Confirmation/"+projectId;
        console.log("this.directory =====>>>>>> ",this.directory);

        return new Promise((resolve,reject)=>{
            console.log("After this.directory =====>>>>>> ",file);

            this.http.post(baseUrl + "file/upload_files?projectId="+projectId +"&directory="+this.directory+"&username="+username+"&orgName="+orgName,file)
            .pipe(map(Response => Response))

            .subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }
    uploadFileVerification(projectId,file,username,orgName):Promise<any> {    
        console.log("file-----",projectId); 
        this.directory="./Verification/"+projectId;
        return new Promise((resolve,reject)=>{
            this.http.post(baseUrl + "file/upload_files?projectId="+projectId +"&directory="+this.directory+"&username="+username+"&orgName="+orgName,file)
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
}