import {Component, OnInit} from '@angular/core';
import {AdminService} from "./admin.service";
import {Route} from "./route";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  sub: any;
  routes;
  constructor(private adminService: AdminService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(() => {
      this.adminService.getRoutes().then(routes => {
        this.routes = routes;
      });
    });
  }
}
