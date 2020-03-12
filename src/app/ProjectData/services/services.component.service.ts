import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
const baseUrl: string = config.url;



@Injectable()
export class ServicesService {
    constructor(private http: HttpClient) { }
    /** 
     * @author Suchheta
     * @param   value  { serviceName, version}
     * @description function to make the user create Projects into the application 
     */
    createService(value): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(baseUrl + "service/", value)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /** 
     * @author Suchheta
     * @param  value  {serviceId, serviceName, version}
     * @description function to update the service details 
     */
    updateService(value): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.put(baseUrl + "service/",value)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

     /** 
     * @author Suchheta
     * @description function to get the Services details 
     */
    getServices(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "service/")
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
   
    /** 
     * @author Suchheta
     * @param  value  {serviceId,projectId}
     * @description function to get the service details 
     */
    getServicesById(serviceId,productId): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "service/Id?productId="+serviceId+"&&prouductId="+ productId)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /** 
     * @author Suchheta
     * @param  value  {serviceId, serviceName, version}
     * @description function to get the service details 
     */
    deleteServices(value): Promise<any> {
        console.log("value",value);
        return new Promise((resolve, reject) => {
            this.http.delete(baseUrl + "service/?serviceId="+ value )
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

}