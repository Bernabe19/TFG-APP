import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CapturaPlatoPage } from './captura-plato.page';

const routes: Routes = [
  {
    path: '',
    component: CapturaPlatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapturaPlatoPageRoutingModule {}
