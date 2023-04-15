import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoPlatoPage } from './info-plato.page';

const routes: Routes = [
  {
    path: '',
    component: InfoPlatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoPlatoPageRoutingModule {}
