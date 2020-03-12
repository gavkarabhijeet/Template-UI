import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { Observable } from "rxjs";
const baseUrl: string = config.url;
export class SignupStubService {
    constructor(private http: HttpClient) { }
    register(value):Observable<any>  {
        console.log("in service.ts")
        return this.http.post(baseUrl + "user/register", value)
        .pipe(map(Response => Response))
        
    }
}