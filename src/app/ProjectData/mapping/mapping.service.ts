import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
const baseUrl: string = config.url;


@Injectable()
export class mappingService {
    constructor(private http: HttpClient) { }



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


 getFileDataByFlowId(flowId) : Promise <any>{

    return new Promise ((resolve,reject) =>{

        this.http.get (baseUrl + "file/?flowId="+ flowId)
        .pipe (map(Response => Response))
        .subscribe((response : any) =>{
            resolve (response);
        }, reject)
    })
 }
}