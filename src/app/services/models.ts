export interface IPlanetsPreview {
  count: number;
  next: string;
  nextPage: string;
  previous: string;
  previousPage: string;
  results: IPlanet[];
}

export interface IPlanet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
  id?: string;
}

export interface IResident {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

export interface IError {
  error: {};
  headers: {};
  message: string;
  name: string;
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
}
