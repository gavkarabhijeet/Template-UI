import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
const baseUrl: string = config.url;
@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  constructor(private http: HttpClient) { }
  /** 
   * @author Sanchita
   * @description function to change password if the user wants to change
   * 
   */
  changePassword(value): Promise<any> {
      return new Promise((resolve, reject) => {
          this.http.put(baseUrl + "user/forgetPassword", value)
              .pipe(map(Response => Response))

              .subscribe((response: any) => {
                  resolve(response);
              }, reject);
      });
  }
}
