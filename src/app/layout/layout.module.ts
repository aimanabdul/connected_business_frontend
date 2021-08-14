import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { CompanyTabsComponent } from './company-tabs/company-tabs.component';



@NgModule({
  declarations: [LayoutComponent, HeaderComponent, CompanyTabsComponent],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
