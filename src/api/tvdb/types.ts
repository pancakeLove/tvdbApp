import {AxiosError} from 'axios';

export interface LoginResponse {
  readonly token: string;
  readonly error?: AxiosError;
}

export interface SearchResultItem {
  readonly aliases: string;
  readonly banner: string;
  readonly firstAired: string;
  readonly id: number;
  readonly image: string;
  readonly network: string;
  readonly overview: string;
  readonly poster: string;
  readonly seriesName: string;
  readonly slug: string;
  readonly status: string;
}
export interface SearchResponse {
  readonly data: SearchResultItem[];
  readonly error?: AxiosError;
}

export interface SeriesDetails {
  readonly added: string;
  readonly airsDayOfWeek: string;
  readonly airsTime: string;
  readonly aliases: [string];
  readonly banner: string;
  readonly firstAired: string;
  readonly id: number;
  readonly imdbId: string;
  readonly network: string;
  readonly networkId: string;
  readonly overview: string;
  readonly rating: string;
  readonly runtime: string;
  readonly seriesId: string;
  readonly seriesName: string;
  readonly siteRating: number;
  readonly siteRatingCount: number;
  readonly slug: string;
  readonly status: string;
  readonly zap2itId: string;
}

export interface SeriesDetailsResponse {
  readonly data: SeriesDetails;
  readonly error?: AxiosError;
}
