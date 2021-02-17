import {AxiosRequestConfig} from 'axios';
// @ts-ignore
import {APIKey, Userkey, Username} from '@env';
import {LoginResponse, SearchResponse, SeriesDetailsResponse} from './types';
import {sendRequest} from '../apiHelpers';

const requestConfig: Partial<AxiosRequestConfig> = {
  baseURL: 'https://api.thetvdb.com/',
  timeout: 10000,
  method: 'get',
};

export const tvdbApi = () => ({
  fetchToken: async () => {
    let config: AxiosRequestConfig = {
      ...requestConfig,
      method: 'post',
      url: 'login',
      data: {
        apikey: APIKey,
        userkey: Userkey,
        username: Username,
      },
    };
    return (await sendRequest(config)) as Promise<LoginResponse>;
  },
  search: async (query: string, jwt: string) => {
    let config: AxiosRequestConfig = {
      ...requestConfig,
      url: 'search/series',
      params: {name: query},
      headers: {Authorization: `Bearer ${jwt}`},
    };
    return (await sendRequest(config)) as SearchResponse;
  },
  details: async (id: number, jwt: string) => {
    let config: AxiosRequestConfig = {
      ...requestConfig,
      url: `series/${id}`,
      params: {id},
      headers: {Authorization: `Bearer ${jwt}`},
    };
    return (await sendRequest(config)) as SeriesDetailsResponse;
  },
});
