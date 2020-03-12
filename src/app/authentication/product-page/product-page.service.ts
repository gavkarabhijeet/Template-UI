import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { Observable } from "rxjs";

const baseUrl: string = config.url;
@Injectable({ providedIn: "root" })

export class ProductPageService {
    
    constructor(private http: HttpClient) { }
    getService(): Promise<any> {
    // var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
    //       .set('Cache-Control', 'no-cache')
    //       .set('Pragma', 'no-cache')
    //       .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
    //       .set('If-Modified-Since', '0');
    return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "service")
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
