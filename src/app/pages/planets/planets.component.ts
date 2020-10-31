import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../../services/swapi.service';
import { IPlanet, IPlanetsPreview } from '../../services/models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {
  data: IPlanet[];
  error: boolean;
  loading = true;

  constructor(public service: SwapiService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.service.getPlanets()
      .subscribe(
        (data: IPlanetsPreview) => this._onLoadSuccess(data),
        response => this._onLoadError(response)
      );
  }

  _onLoadError(response: HttpErrorResponse) {
    this.error = true;
  }

  _onLoadSuccess(data: IPlanetsPreview) {
    this.data = data.results;
    this.error = false;
    this.loading = false;
  }
}
