import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { Observable } from "rxjs";

const baseUrl: string = config.url;
@Injectable({ providedIn: "root" })

export class HomePageService {
    
    constructor(private http: HttpClient) { }
/**
 * @author Sanchita
 * @description This function will call the service to get the product details
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
}