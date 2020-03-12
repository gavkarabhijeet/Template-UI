import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
const baseUrl: string = config.url;

@Injectable()
export class UserListService {
    constructor(private http: HttpClient) { }
    /**
     * @author Sanchita
     * @description This function will be called to get the list of users
     */
    getAllUSers(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "user/getallUsers")
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    approveUserAccount(value): Promise<any> {
        return new Promise((resolve, reject) => {
            var obj={
                'username':value,
                'isActive':true
            }
            console.log("obj",obj)
            this.http.put(baseUrl + "user/approveUser",obj)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}