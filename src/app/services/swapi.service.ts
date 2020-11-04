import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IPlanet, IPlanetsPreview } from './models';
import { map, mergeMap, tap } from 'rxjs/operators';
import { forkJoin, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  constructor(private http: HttpClient) {
  }

  url(path: string): string {
    return `https://swapi.dev/api/${path}`;
  }

  getPlanets(page: string) {
    let path: string;
    let currentPage: string;
    currentPage = page.length ? page.slice(page.lastIndexOf('=') + 1) : '1';
    path = this.url(`planets/?page=${currentPage}`);
    return this.http.get<IPlanetsPreview | HttpErrorResponse>(path)
      .pipe(
        tap((data: IPlanetsPreview) => {
          data.results.forEach(planet => {
            planet.id = planet.url.slice(planet.url.lastIndexOf('planets/') + 8, -1);
          });
        })
      );
  }

  getHash(value: IPlanet): Observable<IPlanet> {
    return of(value);
  }

  getPlanetInfo(planetId: string) {
    const newId = planetId.slice(planetId.lastIndexOf('planet') + 6);
    const path = this.url(`planets/${newId}`);
    return this.http.get(path).pipe(
      mergeMap((info: IPlanet) => {
        const requests = [];
        info.residents.forEach(url => {
          requests.push(this.getHttps(url));
        });
        return forkJoin([this.getHash(info), ...requests]);
      }),
      map(([info, ...residents]: IPlanet[]) => {
        return [info, [...residents]];
      }),
    );
  }

  getHttps(url: string) {
    return this.http.get(url.replace('http', 'https'));
  }

}
