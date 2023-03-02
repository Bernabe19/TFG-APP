import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CapturaPlatoPageRoutingModule } from './captura-plato-routing.module';

import { CapturaPlatoPage } from './captura-plato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CapturaPlatoPageRoutingModule
  ],
  declarations: [CapturaPlatoPage]
})
export class CapturaPlatoPageModule {}
