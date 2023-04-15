import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoPlatoPageRoutingModule } from './info-plato-routing.module';

import { InfoPlatoPage } from './info-plato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoPlatoPageRoutingModule
  ],
  declarations: [InfoPlatoPage]
})
export class InfoPlatoPageModule {}
