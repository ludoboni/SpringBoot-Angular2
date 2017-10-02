import {Component, Input, ViewContainerRef} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {

  constructor(private toastr: ToastsManager, private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }
}
