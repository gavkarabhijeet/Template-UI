import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
const baseUrl: string = config.url;


@Injectable()
export class checkerService {
    constructor(private http: HttpClient) { }



/**
 * @author Suchheta
 * @param value { projectId, repoName, checkerApproval, status, username,
                    createdBy, orgName }
 * @description function to post Data in the
 */

postChecker(checkerJson): Promise<any>{

    return new Promise((resolve,reject) =>{

        this.http.post(baseUrl + "user/approveByChecker" , checkerJson)
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


getCheckerData(): Promise<any>{

    var value = { makerApproval: true}
    return new Promise((resolve,reject) =>{

        this.http.get(baseUrl + "user/getAllUsers"+ value )
        .pipe(map(Response => Response))
        .subscribe((response : any) =>{
            resolve(response);
        }, reject)
    })
 }
 
}
