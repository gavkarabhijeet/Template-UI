import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { Observable } from "rxjs";

const baseUrl: string = config.url;
@Injectable({ providedIn: "root" })

export class CreateAppService {
    directory: string;
    constructor(private http: HttpClient) { }

    /**
     * @author Vaibhav
     * @param name
     * @description This function will be used to get user details by username
     */
    getUserByName(name):Promise<any>{
        console.log("Name ", name)
        return new Promise((resolve,reject)=>{
            this.http.get(baseUrl + "user/?username="+name)
            .pipe(map(Response => Response))

            .subscribe((response: any) => {
                console.log("User Response ",response)
                resolve(response[0]);
            }, reject);
        })
        }

    /**
     * @author Kuldeep
     * @param projectI
     * * @param dataForProject
     * @description This function will be used to post the data of app-Details and serviceDetails page of eCollection 
     */
    updateprojectData(projectId,dataForProject):Promise<any> {
        
        return new Promise((resolve,reject)=>{
            this.http.put(baseUrl + "project/updateUserProject?projectId="+projectId ,dataForProject)
            .pipe(map(Response => Response))

            .subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }

    /**
     * @author Kuldeep
     * @description This function will be called to get the details of single product.
     */
    getProductById(productId): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "product/?productId="+productId)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

     /**
     * @author Kuldeep
     * @description This function will be called to get the details of single service.
     */
    getServiceById(serviceId): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "service/?serviceId="+serviceId)
                .pipe(map(Response => Response))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

     /**
     * @author Kuldeep
     * @description This function will be called to get the details of project
     */
    getProjectDetails(projectId):Promise<any>{
        return new Promise((resolve,reject)=>{
            this.http.get(baseUrl + "project/?projectId="+ projectId)
            .pipe(map(Response => Response))
    
            .subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }

    /**
     * @author Kuldeep
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
     * @author Kuldeep
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
     * @author Kuldeep 
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
     * @author Kuldeep
     * @param dataForProject
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
    uploadFileProd(projectId,file):Promise<any> {    
        console.log("file-----",file); 
        return new Promise((resolve,reject)=>{
            this.http.post(baseUrl + "file/upload_files?projectId="+projectId,file)
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
