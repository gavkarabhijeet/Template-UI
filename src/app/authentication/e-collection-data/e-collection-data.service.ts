import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { Observable } from "rxjs";

const baseUrl: string = config.url;
@Injectable({ providedIn: "root" })

export class ECollectionService {
    constructor(private http: HttpClient) { }

    getServiceData(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "service")
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    
}