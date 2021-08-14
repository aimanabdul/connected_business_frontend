import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {SecurityModule} from './security/security.module';
import { LayoutModule } from './layout/layout.module';
import { SecurityInterceptor } from './security/security.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CompanyModule } from './company/company.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { RoleModule } from './role/role.module';
import { GroupModule } from './group/group.module';
import { PositionModule } from './position/position.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    SecurityModule,
    LayoutModule,
    CompanyModule,
    FontAwesomeModule,
    UserModule,
    PostModule,
    RoleModule,
    GroupModule,
    PositionModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SecurityInterceptor,
    multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
