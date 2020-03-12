import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { Observable } from "rxjs";

const baseUrl: string = config.url;
@Injectable({ providedIn: "root" })
export class SignupService {
    dataObj;
    constructor(private http: HttpClient) { }

    /**
     * @author Sanchita
     * @param value 
     * @description function called to register user
     */

    register(value): Promise<any> {
        console.log("value",value);
        this.dataObj={
            "organisationName": value.organisationName,
            "vanNo": value.vanNo,
            "IFSCCode": value.IFSCCode,
            "accountNumber": value.accountNumber,
            "creditAccountNumber": value.creditAccountNumber,
            "businessSpocName": value.businessSpocName,
            "businessSpocEmails": value.businessSpocEmails,
            "businessSpocMobileNumber": value.businessSpocMobileNumber,
            "ITSpocName": value.ITSpocName,
            "ITSpocEmails": value.ITSpocEmails,
            "ITSpocMobileNumber": value.ITSpocMobileNumber,
            "webService": value.webService,
            "uatPublicIP": value.uatPublicIP,
            "uatPortNo": value.uatPortNo,
            "livePublicIP": value.livePublicIP,
            "livePortNo": value.livePortNo
          }
          console.log("this.dataObj",this.dataObj);
        return new Promise((resolve, reject) => {
            this.http.post(baseUrl + "user/register",this.dataObj)
                .pipe(map(Response => Response))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
