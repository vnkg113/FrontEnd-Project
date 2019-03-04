import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard'
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { CellphonesComponent } from './core/components/cellphones/cellphones.component'
import { BrandsComponent } from './core/components//brands/brands.component'
const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'manage/cellphone',
    component: CellphonesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'resource/brands',
    component: BrandsComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
