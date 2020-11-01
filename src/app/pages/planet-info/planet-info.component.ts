import { Component } from '@angular/core';
import { IPlanet, IResidents } from '../../services/models';
import { HttpErrorResponse } from '@angular/common/http';
import { SwapiService } from '../../services/swapi.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-planet-info',
  templateUrl: './planet-info.component.html',
  styleUrls: ['./planet-info.component.scss']
})
export class PlanetInfoComponent {
  data: IPlanet[];
  residents: IResidents[];
  error: boolean;
  loading = true;

  constructor(
    public service: SwapiService,
    public router: Router,
    public route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(params => {
      this.onRouteParamsChanged(params);
    });
  }

  // ngOnInit() {
  //   this.loadData();
  // }

  loadData(planetId: string) {
    this.service.getPlanetInfo(planetId)
      .subscribe(
        (data: [any, any]) => this._onLoadSuccess(data),
        response => this._onLoadError(response)
      );
  }

  _onLoadError(response: HttpErrorResponse) {
    this.error = true;
  }

  _onLoadSuccess([planetInfo, residents]) {
    // console.log(planetInfo, residents);
    this.residents = residents;
    console.log(this.residents);
    this.error = false;
    this.loading = false;
  }

  onRouteParamsChanged(params: ParamMap) {
    const planetId = params.get('id');
    this.loadData(planetId);
  }
}
