
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
const baseUrl: string = config.url;


@Injectable()
export class newMappingService {
    constructor(private http: HttpClient) { }

    initiateSIT(data): Promise<any> {
        // var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
        .set('If-Modified-Since', '0');
        return new Promise((resolve, reject) => {
            this.http.post(baseUrl + "project/initiateSIT", data,{headers:headers_object})
                .pipe(map(Response => Response))
    
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        })
    }

     /**
     * @author Kuldeep 
     * @description This function is used to logout the user 
     */
    logout(userData):Promise<any> {
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0');
        return new Promise((resolve,reject)=>{
            this.http.post(baseUrl + "user/logout",userData,{headers:headers_object})
            .pipe(map(Response => Response))
  
            .subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }

    /**
     * @author Suchheta
     * @param value {projectId}
     * @description function to get File Data
     */

    getFileDataByProjectId(projectId,type): Promise<any> {
        // var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
        .set('If-Modified-Since', '0');
        return new Promise((resolve, reject) => {

            this.http.get(baseUrl + "file/?projectId=" + projectId+"&type="+type,{headers:headers_object})
                .pipe(map(Response => Response))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject)
        })
    }


    /**
    * @author Suchheta
    * @param value { productId}
    * @description function to get File Data
    */


    getFileDataByFlowId(flowId): Promise<any> {
        // var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
        .set('If-Modified-Since', '0');
        return new Promise((resolve, reject) => {

            this.http.get(baseUrl + "file/?flowId=" + flowId,{headers:headers_object})
                .pipe(map(Response => Response))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject)
        })
    }


    /**
    * @author Suchheta
    * @param value {params, fileName, username, orgName}
    * @description function to post the YAML Data
    */
    postYamlData(yamlObject): Promise<any> {
        // var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
        .set('If-Modified-Since', '0');
        return new Promise((resolve, reject) => {
            this.http.post(baseUrl + "file/ui/yaml", yamlObject,{headers:headers_object})
                .pipe(map(Response => Response))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject)

        })
    }

    /**
        * @author Sagar Chordhekar
        * @param value {mappingDataObject}
        * @description function to bind mapping data with project
        */
    postSaveMappingData(mappingdataObject): Promise<any> {
        // var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
        .set('If-Modified-Since', '0');
        return new Promise((resolve, reject) => {
            this.http.post(baseUrl + "mappingdata/", mappingdataObject,{headers:headers_object})
                .pipe(map(Response => Response))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject)

        })
    }
    /**
     * @author Sanchita Raut
     * @param value {mappingdataObject}
     * @description fucntion to put mapping data
     */
    putSaveMappingData(mappingdataObject):Promise<any>{
        // var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
        .set('If-Modified-Since', '0');
        return new Promise((resolve, reject) => {
            this.http.put(baseUrl + "mappingdata/", mappingdataObject,{headers:headers_object})
                .pipe(map(Response => Response))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject)

        })
    }



    /**
    * @author Suchheta
    * @param value { mappedObj, fileName, clientName, username, orgName}
    * @description function to post the ESQL Data
    */

    postESQL(esqlObject): Promise<any> {
        // var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
        .set('If-Modified-Since', '0');
        return new Promise((resolve, reject) => {

            this.http.post(baseUrl + "file/ui/esql", esqlObject,{headers:headers_object})
                .pipe(map(Response => Response))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject)
        })

    }


    getMappingSourceData(templateName): Promise<any> {
        // var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
        .set('If-Modified-Since', '0');
        return new Promise((resolve, reject) => {

            this.http.get(baseUrl + "mappingdata/source/?templateName=" + templateName,{headers:headers_object})
                .pipe(map(Response => Response))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject)
        })
    }


    postMappingData(mappingObject): Promise<any> {
        // var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
        .set('If-Modified-Since', '0');
        return new Promise((resolve, reject) => {

            this.http.post(baseUrl + "mapping/", mappingObject,{headers:headers_object})
                .pipe(map(Response => Response))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject)
        })

    }

    getMappingData(projectId): Promise<any> {
        // var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
        .set('If-Modified-Since', '0');
        return new Promise((resolve, reject) => {

            this.http.get(baseUrl + "mappingdata/?projectId=" + projectId,{headers:headers_object})
                .pipe(map(Response => Response))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject)

        })
    }

    getProjectData(projectId): Promise<any> {
        // var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
        .set('If-Modified-Since', '0');
        return new Promise((resolve, reject) => {

            this.http.get(baseUrl + "project/?projectId=" + projectId,{headers:headers_object})
                .pipe(map(Response => Response))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject)

        })
    }
    getServiceDetails(serviceId): Promise<any> {
        // var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
        .set('If-Modified-Since', '0');
        return new Promise((resolve, reject) => {

            this.http.get(baseUrl + "service/?serviceId=" + serviceId,{headers:headers_object})
                .pipe(map(Response => Response))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject)

        })
    }



    getUserDataByName(username): Promise<any> {
        // var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
        .set('If-Modified-Since', '0');
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "user/?username=" + username,{headers:headers_object})
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        })
    }
    getUserDetails(): Promise<any> {
        // var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
        .set('If-Modified-Since', '0');
        var value = { makerApproval: true}
        return new Promise((resolve, reject) => {
            this.http.get(baseUrl + "user/?makerApproval='true'",{headers:headers_object})
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        })
    }
}