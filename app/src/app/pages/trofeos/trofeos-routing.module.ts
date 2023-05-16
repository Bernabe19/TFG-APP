import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrofeosPage } from './trofeos.page';

const routes: Routes = [
  {
    path: '',
    component: TrofeosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrofeosPageRoutingModule {}
