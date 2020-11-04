import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanetsComponent } from './pages/planets/planets.component';
import { PlanetInfoComponent } from './pages/planet-info/planet-info.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'planets',
    pathMatch: 'full'
  },
  {
    path: 'planets',
    component: PlanetsComponent,
  },
  {
    path: 'planets/:planet',
    component: PlanetInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
