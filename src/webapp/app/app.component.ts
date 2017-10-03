import {Component, Input, ViewContainerRef, EventEmitter, Output, OnDestroy, AfterViewInit} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import {TranslateService} from '@ngx-translate/core';
declare var tinymce: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements AfterViewInit, OnDestroy{
  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;
  constructor(private toastr: ToastsManager, private vcr: ViewContainerRef, private translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('fr');
  }

  ngAfterViewInit() {
    tinymce.init({
      selector: '#editor',
      plugins: ['link', 'paste', 'table'],
      skin_url: './assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
