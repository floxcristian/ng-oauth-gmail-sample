import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { HomeRoutingModule } from './home-routing.module';
// Pages
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule]
})
export class HomeModule {}
