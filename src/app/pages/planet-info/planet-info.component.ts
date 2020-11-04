import { Component } from '@angular/core';
import { IError, IPlanet, IResidents } from '../../services/models';
import { HttpErrorResponse } from '@angular/common/http';
import { SwapiService } from '../../services/swapi.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-planet-info',
  templateUrl: './planet-info.component.html',
  styleUrls: ['./planet-info.component.scss']
})

export class PlanetInfoComponent {
  data: IPlanet[];
  planetInfo: IPlanet;
  residents: IResidents[];
  allResidents: IResidents[];
  errorData: IError;
  error: boolean;
  loading = true;

  constructor(
    public service: SwapiService,
    public router: Router,
    public route: ActivatedRoute,
    private _location: Location
  ) {
    this.route.paramMap.subscribe(params => {
      this.onRouteParamsChanged(params);
    });
  }

  goBack() {
    this._location.back();
  }

  filterResidents(event) {
    const gender = event.target.id.trim().toLowerCase();
    if (gender !== 'all') {
      this.residents = this.allResidents.filter(resident => resident.gender === gender);
      return;
    }
    this.residents = this.allResidents;
  }

  loadData(planetId: string) {
    this.service.getPlanetInfo(planetId)
      .subscribe(
        (data: [any, any]) => {
          this._onLoadSuccess(data);
        },
        response => this._onLoadError(response)
      );
  }

  _onLoadError(response: HttpErrorResponse) {
    this.error = true;
    this.errorData = response;
  }

  _onLoadSuccess([planetInfo, residents]) {
    this.planetInfo = planetInfo;
    this.residents = residents;
    this.allResidents = residents;
    this.error = false;
    this.loading = false;
  }

  onRouteParamsChanged(params: ParamMap) {
    const planetId = params.get('planet');
    this.loadData(planetId);
  }
}
