import {HttpService} from "../http/http.service";
import {Injectable} from "@angular/core";
import {Route} from "./route";


@Injectable()
export class AdminService {
  private adminUrl = "routes/";

  constructor(private httpService: HttpService) {
  }

  public getRoutes() {
    return new Promise((resolve, reject) => {
      this.httpService.get(this.adminUrl)
        .then(res => {
            let routesJSON = res.json();
            let route = Array<Route>();
          routesJSON.forEach(routeJSON => {
            route.push(this.mapRoute(routeJSON));
            });
            resolve(route);
          }
        ).catch((err) => {
        reject(this.handleError(err));
      });
    });
  }

  public getRoute(id: number) {
    const url = `${this.adminUrl}${id}`;
    return this.httpService.get(url)
      .then(res => <Route>(res.json()))
      .catch(this.handleError);
  }

  public modifyRoute(object: any) {
    const url = `${this.adminUrl}${object.id}`;
    return this.httpService.put(url, object)
      .then(res => <Route>(res.json()))
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  //map a user object
  private mapRoute(obj) {
    let route = new Route();
    route.id = obj.id;
    route.method = obj.method;
    route.permissions = obj.permissions;
    route.url = obj.url;
    return route;
  }

}
