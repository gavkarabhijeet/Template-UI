import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
const baseUrl: string = config.url;


@Injectable()
export class makerService {
    constructor(private http: HttpClient) { }



/**
 * @author Suchheta
 * @param value { projectId, repoName, checkerApproval, status, username,
                    createdBy, orgName }
 * @description function to post Data in the
 */

postMaker(makerJson): Promise<any>{

    return new Promise((resolve,reject) =>{

        this.http.post(baseUrl + "user/approveByMaker" , makerJson)
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


getMakerData(): Promise<any>{

    return new Promise((resolve,reject) =>{

        this.http.get(baseUrl + "user/getUsersFTUC" )
        .pipe(map(Response => Response))
        .subscribe((response : any) =>{
            resolve(response);
        }, reject)
    })
 }
 
}