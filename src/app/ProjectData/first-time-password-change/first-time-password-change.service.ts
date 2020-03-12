import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { resolve } from 'url';
const baseUrl: string = config.url;

@Injectable()
export class FirstTimePasswordChangeService {
    
    constructor(private http: HttpClient) { }
        /** 
     * @author Sanchita
     * @param value{username,oldPassword,newPassword,confirmPassword}
     * @description function to change password if the user wants to change
     * 
     */
    changePassword(value): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(baseUrl + "user/changePassword", value)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /**
     * @author Sanchita
     * 
     * @description function to change some of the User Details
     */
    updateUser(value): Promise<any> {
        return new Promise((resolve, reject) => {
            var obj={
                'username':value,
                'FTUC':true
            }
            this.http.put(baseUrl + "user/updateUser", obj)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}