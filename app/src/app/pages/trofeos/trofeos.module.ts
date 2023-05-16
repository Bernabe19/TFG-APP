import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrofeosPageRoutingModule } from './trofeos-routing.module';

import { TrofeosPage } from './trofeos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrofeosPageRoutingModule
  ],
  declarations: [TrofeosPage]
})
export class TrofeosPageModule {}
