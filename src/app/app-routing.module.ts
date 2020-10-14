import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CreateComponent } from './inventory/create/create.component';
import { ListViewComponent } from './inventory/list-view/list-view.component';
import { ProductViewComponent } from './inventory/product-view/product-view.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'product/create', component: CreateComponent ,canActivate: [AuthGuard] },
  { path: 'product/list', component: ListViewComponent ,canActivate: [AuthGuard]},
  { path: 'product/:id', component: ProductViewComponent ,canActivate: [AuthGuard]},
  { path: 'product/edit/:id', component: CreateComponent,canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =  [CreateComponent,ListViewComponent,ProductViewComponent,LoginComponent];