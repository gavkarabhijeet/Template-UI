import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
const baseUrl: string = config.url;
import { ProjectManagementServiceStub } from './project-management.service.stub';


@Injectable()
export class ProjectManagementService {
    constructor(private http: HttpClient) { }
    /** 
     * @author Suchheta
     * @param   value  { projectName, version}
     * @description function to make the user create Projects into the application 
     */
    createProject(value): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(baseUrl + "project/", value)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /** 
     * @author Suchheta
     * @param  value  {projectId, projectName, version}
     * @description function to update the Project details 
     */
    updateProject(value): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.put(baseUrl + "project/", value)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

     /** 
     * @author Suchheta
     * @description function to get the Project details 
     */
    getProject(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "project/")
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /** 
     * @author Suchheta
     * @param  value  {projectId}
     * @description function to get the Project details 
     */
    getProjectyId(value): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "project/Id?projectId="+value)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /** 
     * @author Suchheta
     * @param  value  {projectId}
     * @description function to get the Project details 
     */
    deleteProject(value): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.delete(baseUrl + "project/?projectId="+ value )
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

     /** 
     * @author Sanchita
     * @param  value  {file:formData}
     * @description function to store the file 
     */
    storeFile(projectId,file): Promise<any> {
        console.log("file",file);
        return new Promise((resolve, reject) => {
            this.http.post(baseUrl + "file/?projectId="+projectId,file)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    
     

/**
 * @author Suchheta
 * @param value {projectId}
 * @description function to get File Data
 */

 getFileDataByProjectId(projectId): Promise<any>{

    return new Promise((resolve,reject) =>{

        this.http.get(baseUrl + "file/?projectId=" + projectId)
        .pipe(map(Response => Response))
        .subscribe((response : any) =>{
            resolve(response);
        }, reject)
    })
 }


 /**
 * @author Suchheta
 * @param value { productId}
 * @description function to get File Data
 */


 getFileDataByProductId(productId) : Promise <any>{

    return new Promise ((resolve,reject) =>{

        this.http.get (baseUrl + "file/?productId="+ productId)
        .pipe (map(Response => Response))
        .subscribe((response : any) =>{
            resolve (response);
        }, reject)
    })
 }
}