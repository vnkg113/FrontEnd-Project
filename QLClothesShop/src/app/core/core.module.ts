import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { MaterialModule } from '../../app/material/material.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../../environments/environment';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductModule } from "../core/components/product/product.module";
import { SharedModule } from "../shared/shared.module";

import { CellphonesComponent } from './components/cellphones/cellphones.component';
import { CellphoneComponent } from './components//cellphones/cellphone/cellphone.component';
import { CellphoneListComponent } from './components//cellphones/cellphone-list/cellphone-list.component';

import { BrandsComponent } from './components/brands/brands.component';
import { BrandComponent } from './components/brands/brand/brand.component'
import { BrandListComponent } from './components/brands/brand-list/brand-list.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


import { MatConfirmDialogComponent } from './components/mat-confirm-dialog/mat-confirm-dialog.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

import { CellphoneService } from '../shared/services/cellphone.service';
import { BrandService } from '../shared/services/brand.service';
import { AuthService } from '../shared/services/auth.service';
@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MaterialModule,
    CommonModule,
    ProductModule,
    SharedModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CellphoneService, BrandService, AuthService, DatePipe],
  entryComponents: [CellphoneComponent, BrandComponent, MatConfirmDialogComponent],
  declarations: [CoreComponent,
    NavigationBarComponent,
    SidenavComponent,
    CellphonesComponent,
    CellphoneComponent,
    BrandsComponent,
    BrandComponent,
    BrandListComponent,
    LoginComponent,
    RegisterComponent,
    CellphoneListComponent,
    MatConfirmDialogComponent
  ],
  exports: [NavigationBarComponent, SidenavComponent, CellphonesComponent, BrandsComponent]

})
export class CoreModule { }
