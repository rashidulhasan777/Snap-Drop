import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';

const MatComponents = [
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatDividerModule,
  MatMenuModule,
  MatCardModule,
  MatAutocompleteModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule
];

@NgModule({
  imports: [MatComponents],
  exports: [MatComponents],
})
export class MaterialComponentsModule {}
