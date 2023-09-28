import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApiTestPage } from './api-test.page';

const routes: Routes = [
  {
    path: '',
    component: ApiTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiTestPageRoutingModule {}
