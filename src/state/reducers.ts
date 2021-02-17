import {Reducer} from 'redux';
import {TvDbActionTypes} from './actions';
import {Action} from 'typesafe-actions';
import {SearchResultItem, SeriesDetails} from '../api/tvdb/types';
import {GeneralError} from '../shared/types';

export interface TvDbState {
  loginInit: boolean;
  token: string;
  loginError: boolean;
  searchResult?: SearchResultItem[];
  apiError?: GeneralError;
  isLoading: boolean;
  seriesDetails?: SeriesDetails;
}

const initialState = {
  loginInit: false,
  token: '',
  loginError: false,
  searchResult: [],
  apiError: {error: false, message: ''},
  isLoading: false,
};

export interface DispatchAction extends Action<TvDbActionTypes> {
  payload: Partial<TvDbState>;
}

export const tvDbReducer: Reducer<TvDbState, DispatchAction> = (
  state = initialState,
  action,
) => {
  switch (action?.type) {
    case TvDbActionTypes.LOGIN_REQUEST:
      return {...state, loginError: false, loginInit: true};
    case TvDbActionTypes.LOGIN_SUCCESS:
      return {...state, token: action.payload as string, isLoading: false};
    case TvDbActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        token: '',
        loginError: true,
      };
    case TvDbActionTypes.SEARCH_SUCCESS:
      return {
        ...state,
        searchResult: action.payload as SearchResultItem[],
        isLoading: false,
      };
    case TvDbActionTypes.DETAILS_SUCCESS:
      return {
        ...state,
        seriesDetails: action.payload as SeriesDetails,
        isLoading: false,
      };
    case TvDbActionTypes.API_ERROR:
      return {
        ...state,
        apiError: action.payload as GeneralError,
        isLoading: false,
      };
    default:
      return state;
  }
};
