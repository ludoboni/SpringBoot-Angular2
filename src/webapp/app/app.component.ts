import {Component, Input, ViewContainerRef} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {

  constructor(private toastr: ToastsManager, private vcr: ViewContainerRef, private translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('fr');
  }
}
