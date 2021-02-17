import {createStandardAction} from 'typesafe-actions';
import {SearchResultItem, SeriesDetails} from '../api/tvdb/types';
import {GeneralError} from '../shared/types';

export enum TvDbActionTypes {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  SEARCH_REQUEST = 'SEARCH_REQUEST',
  SEARCH_SUCCESS = 'SEARCH_SUCCESS',
  DETAILS_REQUEST = 'DETAILS_REQUEST',
  DETAILS_SUCCESS = 'DETAILS_SUCCESS',
  API_ERROR = 'API_ERROR',
  IS_LOADING = 'IS_LOADING',
}

export const tvDbActions = {
  loginRequest: createStandardAction(TvDbActionTypes.LOGIN_REQUEST)<null>(),
  loginSuccess: createStandardAction(TvDbActionTypes.LOGIN_SUCCESS)<string>(),
  loginFailure: createStandardAction(TvDbActionTypes.LOGIN_FAILURE)(),
  searchRequest: createStandardAction(TvDbActionTypes.SEARCH_REQUEST)<string>(),
  searchSuccess: createStandardAction(TvDbActionTypes.SEARCH_SUCCESS)<
    SearchResultItem[]
  >(),
  detailsRequest: createStandardAction(
    TvDbActionTypes.DETAILS_REQUEST,
  )<number>(),
  detailsSuccess: createStandardAction(
    TvDbActionTypes.DETAILS_SUCCESS,
  )<SeriesDetails | null>(),
  apiError: createStandardAction(
    TvDbActionTypes.API_ERROR,
  )<GeneralError | null>(),
  isLoading: createStandardAction(TvDbActionTypes.IS_LOADING)<boolean>(),
};
