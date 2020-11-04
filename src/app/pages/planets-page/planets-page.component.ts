import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../../services/swapi.service';
import { IError, IPlanet, IPlanetsPreview } from '../../services/models';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-planets',
  templateUrl: './planets-page.component.html',
  styleUrls: ['./planets-page.component.scss']
})
export class PlanetsPageComponent {
  data: IPlanet[];
  dataPreview: IPlanetsPreview;
  errorData: IError;
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

  pageSlice(page) {
    return page.slice(page.lastIndexOf('=') + 1);
  }

  loadData(page = '') {
    this.service.getPlanets(page)
      .subscribe(
        (data: IPlanetsPreview) => this._onLoadSuccess(data),
        response => this._onLoadError(response)
      );
  }

  _onLoadSuccess(data: IPlanetsPreview) {
    this.data = data.results;
    this.dataPreview = data;
    this.error = false;
    this.loading = false;
  }

  _onLoadError(response: HttpErrorResponse) {
    this.error = true;
    this.errorData = response;
  }

  onRouteParamsChanged(params: ParamMap) {
    const page = params.get('page') ? params.get('page') : '';
    this.loadData(page);
  }
}
