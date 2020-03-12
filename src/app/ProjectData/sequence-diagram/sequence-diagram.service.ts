import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { resolve } from 'url';
const baseUrl: string = config.url;

@Injectable()
export class SequenceDiagramService {
    file;
    constructor(private http: HttpClient) { }
    /**
     * @author Sanchita & Suchheta
     * @param value {file}
     * @description This function is used to post the flow images in database
     */
    postFlow(value, flowName): Promise<any> {
        this.file = value;
        return new Promise((resolve, reject) => {
            let diagram = "FlowDiagram";
            this.http.post(baseUrl + "flow/?path=" + diagram + "&&flowName=" + flowName, value)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /**
    * @author Sanchita
    * @param value 
    * @description This function is used to get the flow data from database
    */
    getFlow(): Promise<any> {
        return new Promise((resolve, reject) => {
            // let diagram = "FlowDiagram";
            this.http.get(baseUrl + "flow/?flowId")
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /**
    * @author Suchheta
    * @param value {flowId }
    * @description This function is used to delete the flow by its flowId
    */
    deleteFlow(flowId): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.delete(baseUrl + "flow/?flowId=" + flowId)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);

        });
    }
    /**
    * @author Suchheta
    * @param value {flowId , value}
    * @description This function is used to update the flow data
    */
    updateFlow(flowId, value): Promise<any> {
        this.file = value;
        return new Promise((resolve, reject) => {
            let diagram = "FlowDiagram";
            this.http.put(baseUrl + "flow/?flowId=" + flowId + "&&path=" + diagram, value)
                .pipe(map(Response => Response))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
    * @author Suchheta
    * @param value {flowId , projectId}
    * @description This function is used to update the projectId in database
    */
    updateProjectId(flowId, projectId): Promise<any> {
        var object = {
            "flowId": flowId,
            "projectId": [projectId]
        }
        return new Promise((resolve, reject) => {
            let diagram = "FlowDiagram";
            this.http.put(baseUrl + "flow/projectId", object)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /** 
    * @author Sanchita
    * @description service to show the flow image in by flowId
    */
    getFlowDisplay(flowId): Promise<any> {
        return new Promise((resolve, reject) => {

            this.http.get(baseUrl + "flow/?file=" + flowId)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);

        });
    }
    /** 
   * @author Sanchita
   * @param value{flowId, projectId} 
   * @description service to add flow in the project on the basisof projectId 
   */
    addFlowIdInProject(flowId, projectId): Promise<any> {
        return new Promise((resolve, reject) => {
            var object = {
                "projectId": projectId,
                "flows": [flowId]
            }
            this.http.put(baseUrl + "project", object)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);

        });
    }
    /** 
    * @author Sanchita
    * @param value{projectId} 
    * @description service to get the projectData data by its projectId
    */
    getProjectData(projectId): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "project/Id?projectId=" + projectId)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /** 
    * @author Sanchita
    * @param value{flowIdFromProduct} 
    * @description service to get the flow data by its flowId
    */
    getFlowById(flowIdFromProduct): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "flow/?flowId=" + flowIdFromProduct)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);

        });
    }
    /** 
   * @author Sanchita
   * @param value{projectId, flowId} 
   * @description service to get the product data by its productId
   */
    getProductByProductId(productId): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "product/?productId=" + productId)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /** 
   * @author Sanchita
   * @param value{projectId, flowId} 
   * @description service to add multiple productId in the project
   */
    addFlowsIdInProjectMultiple(flowId, projectId): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log("valueId", flowId);
            var value = [];
            console.log("projectId", projectId);
            for (var i = 0; i < flowId.length; i++) {
                value.push(flowId[i]);
            }
            console.log("value", value)

            var object = {
                "projectId": projectId,
                "flows": value
            }
            this.http.put(baseUrl + "project", object)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}