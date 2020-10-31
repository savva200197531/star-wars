import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlanetsComponent } from './pages/planets/planets.component';
import { PlanetInfoComponent } from './pages/planet-info/planet-info.component';

@NgModule({
  declarations: [
    AppComponent,
    PlanetsComponent,
    PlanetInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
