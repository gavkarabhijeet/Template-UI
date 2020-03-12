import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
const baseUrl: string = config.url;

@Injectable()
export class LoginService {
    results = [];
    constructor(private http: HttpClient) { }
    /**\
     * @author Kuldeep Narvekar
     * @param username
     * @description Function to get the details of the user based on its username 
     *
     */
    getUserAudit(username): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "user/getUserAudit?username=" + username)
                .pipe(map(Response => Response))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /** 
     * @author Sanchita
     * @param value {username,password}
     * @description function to make the user logged into the application 
     */
    login(value): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(baseUrl + "user/login", value)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /** 
     * @author Kuldeep
     * @param value {username,newPassword,confirmPassword}
     * @description function to reset users password if forgets it 
     */
    loginResetLink(value): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(baseUrl + "user/sendForgotPassMail", value)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**\
     * @author Sanchita
     * @param username
     * @description Function to get the details of the user based on its username 
     *
     */
    userDetails(username): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "user/?username=" + username)
                .pipe(map(Response => Response))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
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
    getProductsData(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "product")
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
