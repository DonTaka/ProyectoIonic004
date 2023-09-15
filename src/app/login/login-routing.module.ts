import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { UsuarioComponent } from '../usuario/usuario.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    children:[{
      path:'usuario',
      component:UsuarioComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
