import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanetsPageComponent } from './pages/planets-page/planets-page.component';
import { PlanetInfoPageComponent } from './pages/planet-info-page/planet-info-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'planets',
    pathMatch: 'full'
  },
  {
    path: 'planets',
    component: PlanetsPageComponent,
  },
  {
    path: 'planets/:planet',
    component: PlanetInfoPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
