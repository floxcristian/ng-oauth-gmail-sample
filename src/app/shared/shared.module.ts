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
import { TimeAgoPipe } from './pipes/time-ago/time-ago.pipe';

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule
];

const COMPONENTS = [HeaderComponent, MainLayoutComponent];
const PIPES = [TimeAgoPipe];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  imports: [RouterModule, ...MODULES],
  exports: [MODULES, COMPONENTS, PIPES]
})
export class SharedModule {}
