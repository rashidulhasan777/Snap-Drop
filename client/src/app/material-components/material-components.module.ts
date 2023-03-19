import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

const MatComponents = [
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatDividerModule,
];

@NgModule({
  imports: [MatComponents],
  exports: [MatComponents],
})
export class MaterialComponentsModule {}
