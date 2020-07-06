// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// UI module
import { MaterialModule } from './material.module';
// Layout
import { HeaderComponent } from './layout/header/header.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule
];

const COMPONENTS = [HeaderComponent, MainLayoutComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [RouterModule, ...MODULES],
  exports: [MODULES, COMPONENTS]
})
export class SharedModule {}
