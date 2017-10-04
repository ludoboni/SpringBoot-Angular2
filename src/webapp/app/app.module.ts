import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Http, HttpModule, JsonpModule} from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { AppComponent } from './app.component';
import { AppRoutingModule }     from './app-routing.module';
import {UsersComponent} from "./users/profile/users-profile.component";
import {HttpService} from "./http/http.service";
import {LoginComponent} from "./users/login/login.component";
import {ToastModule} from "ng2-toastr";
import {HomeComponent} from "./home/home.component";
import {UserService} from "./users/services/users.service";
import {SignupComponent} from "./users/login/signup.component";
import {TelephoneComponent} from "./users/telephones/telephone.component";
import {TelephoneService} from "./users/services/telephones.service";
import {AddressComponent} from "./users/addresses/address.component";
import {AddressService} from "./users/services/address.service";
import {TelephoneDetailComponent} from "./users/telephones/telephone-detail.component";
import {AddressDetailComponent} from "./users/addresses/address-detail.component";
import { ReactiveFormsModule } from '@angular/forms';
import {UserEditComponent} from "./users/profile/user-profile-edit.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {ChatComponent} from "./chat/chat.component";
import {ChatService} from "./chat/chat.service";
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AdminComponent} from "./admin/admin.component";
import {AdminService} from "./admin/admin.service";



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    TelephoneComponent,
    TelephoneDetailComponent,
    AddressComponent,
    AddressDetailComponent,
    UserEditComponent,
    NavbarComponent,
    ChatComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    JsonpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    LocalStorageModule.withConfig({
      prefix: 'real-english-app',
      storageType: 'localStorage'
    }),
    ToastModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [HttpService, UserService, TelephoneService, AddressService, ChatService, HttpClient, TranslateService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
