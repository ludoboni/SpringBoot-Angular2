import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Http} from "@angular/http";



@Injectable()
export class AdminService{
  private headers = new Headers({'Content-Type': 'application/json'});
  private adminUrl = environment.apiHost + "/api/admin";

  constructor(private http: Http){
  }
}
