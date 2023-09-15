import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorPagePage } from './error-page.page';

const routes: Routes = [
  {
    path: '',
    component: ErrorPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorPagePageRoutingModule {}
