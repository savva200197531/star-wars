import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IPlanetsPreview } from './models';
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

  getPlanets() {
    const path = this.url('planets');
    return this.http.get<IPlanetsPreview | HttpErrorResponse>(path)
      .pipe(
        tap((data: IPlanetsPreview) => {
          data.results.forEach(planet => {
            planet.id = planet.url.slice(planet.url.lastIndexOf('planets/') + 8, -1);
          });
        })
      );
  }

  getHash(value: any): Observable<any> {
    return of(value);
  }

  getPlanetInfo(planetId: string) {
    const path = this.url(`planets/${planetId}`);
    return this.http.get(path).pipe(
      mergeMap((info: any) => {
        const requests = [];

        info.residents.forEach(url => {
          requests.push(this.getResident(url));
        });
        return forkJoin([this.getHash(info), ...requests]);
      }),
      map(([info, ...residents]) => {
        return [info, [...residents]];
      }),
    );
  }

  getResident(url: string) {
    return this.http.get(url.replace('http', 'https'));
  }

}
