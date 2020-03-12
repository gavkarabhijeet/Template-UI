import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { json } from 'd3';
import { Observable } from "rxjs";
const baseUrl: string = config.url;



@Injectable()
export class ProductsServiceStub {
    constructor(private http: HttpClient) { }
    /** 
     * @author Suchheta
     * @param   value  {productId, productName, version}
     * @description service to make the user create Projects into the application 
     */
    createProduct(value): Observable<any> {

        return this.http.post(baseUrl + "product/", value)
            .pipe(map(Response => Response))


    }
    /** 
     * @author Suchheta
     * @param  value  {productId, productName, version}
     * @description service to update the Product details 
     */
    updateProduct(value): Observable<any> {
        return this.http.put(baseUrl + "product/", value)
            .pipe(map(Response => Response))


    }

    /** 
    * @author Suchheta
    * @param  value  {productId}
    * @description service to get the Product by Product Id 
    */
    getProductByProductId(value): Observable<any> {
        return this.http.get(baseUrl + "product/?productId=" + value)
            .pipe(map(Response => Response))



    }
    /** 
     * @author Suchheta
     * @param  value  {productId}
     * @description service to get the Product by Project Id 
     */
    getProductByProjectId(value): Observable<any> {
        return this.http.get(baseUrl + "product/?projectId=" + value)
            .pipe(map(Response => Response))


    }
    /** 
     * @author Suchheta
     * @param  value  {productId}
     * @description service to get the delete the Product
     */
    deleteProduct(value): Observable<any> {
        return this.http.delete(baseUrl + "product/?productId=" + value)
            .pipe(map(Response => Response))

    }
    /** 
    * @author Suchheta
    * @description service to get the Product details 
    */
    getAllProducts(): Observable<any> {
        return this.http.get(baseUrl + "product/")
            .pipe(map(Response => Response))


    }

    /**
* @author Sanchita
* @param value{productId, projectId} 
* @description service to add productId in the project
*/
    addProductIdInProject(productId, projectId): Observable<any> {

        // let id= id;

        console.log("valueId", productId);
        console.log("projectId", projectId);

        var object = {
            "projectId": projectId,
            "products": [productId]
        }
        return this.http.put(baseUrl + "project", object)
            .pipe(map(Response => Response))


    }
    /** 
    * @author Sanchita
    * @param value{productId, projectId} 
    * @description service to add multiple productId in the project
    */
    addProductIdInProjectMultiple(productId, projectId): Observable<any> {

        console.log("valueId", productId);
        var value = [];
        console.log("projectId", projectId);
        for (var i = 0; i < productId.length; i++) {
            value.push(productId[i]);
        }
        console.log("value", value)
        var object = {
            "projectId": projectId,
            "products": value
        }
        console.log("updated object =>  ", object);
        return this.http.put(baseUrl + "project", object)
            .pipe(map(Response => Response))


    }
    /** 
    * @author Sanchita
    * @param value{productId, projectId} 
    * @description service to get project based on projectId
    */
    getProjectData(projectId): Observable<any> {
        return this.http.get(baseUrl + "project/Id?projectId=" + projectId)
            .pipe(map(Response => Response))
        // let diagram = "FlowDiagram";

    }
}