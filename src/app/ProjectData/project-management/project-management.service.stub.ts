import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { Observable } from "rxjs";
const baseUrl: string = config.url;

@Injectable()
export class ProjectManagementServiceStub {
    constructor(public http: HttpClient) { }
    /** 
     * @author Suchheta
     * @param   value  { projectName, version}
     * @description function to make the user create Projects into the application 
     */
    createProject(value): Observable<any> {
        return  this.http.post(baseUrl + "project/", value)
                .pipe(map(Response => Response))

    }
    /** 
     * @author Suchheta
     * @param  value  {projectId, projectName, version}
     * @description function to update the Project details 
     */
    updateProject(value):Observable<any>{
        return  this.http.put(baseUrl + "project/", value)
        .pipe(map(Response => Response))
           
    }

     /** 
     * @author Suchheta
     * @description function to get the Project details 
     */
    getProject() :Observable<any>{
        
        return this.http.get("http://192.168.2.104 :3002/api/project/")
            .pipe(map(Response => Response))
                
    }

    /** 
     * @author Suchheta
     * @param  value  {projectId}
     * @description function to get the Project details 
     */
    getProjectyId(value) :Observable<any> {
        return   this.http.get(baseUrl + "project/Id?projectId="+value)
        .pipe(map(Response => Response))

           
               
        
    }
    /** 
     * @author Suchheta
     * @param  value  {projectId}
     * @description function to get the Project details 
     */
    deleteProject(value) :Observable<any> {
        console.log("value =>", value)
        console.log(baseUrl + "project/?projectId="+ value)
        return this.http.delete(baseUrl + "project/?projectId="+ value )
        .pipe(map(Response => Response))
        

    }

}