export interface CountryItem {
  id: number;
  name: string;
  slug: string;
  continent: string;
  status: "Active" | "Inactive";
}

export interface StateItem {
  id: number;
  name: string;
  slug: string;
  countryId: number;
  countryName: string;
  status: "Active" | "Inactive";
}

export interface CityItem {
  id: number;
  name: string;
  slug: string;
  countryId: number;
  countryName: string;
  stateId: number;
  stateName: string;
  status: "Active" | "Inactive";
}

export interface LocationSettings {
  singleCountryMode: boolean;
  defaultCountryId: number;
}
