import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { json } from 'd3';
const baseUrl: string = config.url;



@Injectable()
export class ProductsService {
    constructor(private http: HttpClient) { }
    /** 
     * @author Suchheta
     * @param   value  {productId, productName, version}
     * @description service to make the user create Projects into the application 
     */
    createProduct(value): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(baseUrl + "product/", value)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /** 
     * @author Suchheta
     * @param  value  {productId, productName, version}
     * @description service to update the Product details 
     */
    updateProduct(value): Promise<any> {
        return new Promise((resolve, reject) => {
            
            this.http.put(baseUrl + "product/", value)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

     /** 
     * @author Suchheta
     * @param  value  {productId}
     * @description service to get the Product by Product Id 
     */
    getProductByProductId(value): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "product/?productId="+value)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /** 
     * @author Suchheta
     * @param  value  {productId}
     * @description service to get the Product by Project Id 
     */
    getProductByProjectId(value): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "product/?projectId="+value)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /** 
     * @author Suchheta
     * @param  value  {productId}
     * @description service to get the delete the Product
     */
    deleteProduct(value): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.delete(baseUrl + "product/?productId="+ value )
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
     /** 
     * @author Suchheta
     * @description service to get the Product details 
     */
   getAllProducts(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "product/" )
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * @author Suchheta
     * @param : productId & id, status of projectId
     * @description: service to delete an index in projectId;
     */

     deleteProjectId(projectId): Promise<any>{

console.log("Project Id json = ", projectId)

         return new Promise ((resolve,reject)=>{
            //  this.http.delete (baseUrl + "product/Id?projectId=", projectId )
            this.http.request('delete', baseUrl+ "product/Id", { body: projectId })
             .pipe (map(Response => Response))
             .subscribe((response: any) =>{
                 resolve(response);
                },reject)
             })
        
     }
       /**
   * @author Sanchita
   * @param value{productId, projectId} 
   * @description service to add productId in the project
   */
     addProductIdInProject(productId, projectId): Promise<any> {
        return new Promise((resolve, reject) => {
            // let id= id;
            
            console.log("valueId", productId);
            console.log("projectId", projectId);

            var object = {
                "projectId": projectId,
                "products": [productId]
            }
            this.http.put(baseUrl + "project",object)
            .pipe(map(Response => Response))

            .subscribe((response: any) => {
                resolve(response);
            }, reject);

        });
    }
    /** 
    * @author Sanchita
    * @param value{productId, projectId} 
    * @description service to add multiple productId in the project
    */
    addProductIdInProjectMultiple(productId, projectId): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log("valueId", productId);
            var value=[];
            console.log("projectId", projectId);
            for(var i=0;i<productId.length;i++){
                value.push(productId[i]);
            }
            console.log("value",value)
                 var object = {
                    "projectId": projectId,
                    "products": value
                }
                console.log("updated object =>  ",object);
                this.http.put(baseUrl + "project",object)
                .pipe(map(Response => Response))
    
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /** 
    * @author Sanchita
    * @param value{productId, projectId} 
    * @description service to get project based on projectId
    */
    getProjectData(projectId): Promise<any> {
        return new Promise((resolve, reject) => {
            // let diagram = "FlowDiagram";
            this.http.get(baseUrl + "project/Id?projectId="+projectId)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}