import {
  takeLatest,
  call,
  put,
  all,
  select,
  getContext,
} from 'redux-saga/effects';
import {tvDbActions, TvDbActionTypes} from './actions';
import {
  LoginResponse,
  SearchResponse,
  SeriesDetailsResponse,
} from '../api/tvdb/types';
import {AxiosError} from 'axios';
import {TvDbState} from './reducers';
import {PayloadAction} from 'typesafe-actions';

function* handleApiError(error: AxiosError<any>) {
  let message: string = '';
  if (error.response) {
    message = 'Server responded with non 2xx status: ' + error.response.status;
  } else if (error.request) {
    message = 'Timeout received, possible slow network';
  } else {
    message = error.message;
  }
  yield put(tvDbActions.apiError({error: true, message}));
}

export function* loginWatcher() {
  yield takeLatest(TvDbActionTypes.LOGIN_REQUEST, loginWorker);
}
export function* loginWorker() {
  yield put(tvDbActions.isLoading(true));
  const tvdbApi = yield getContext('tvdbApi');
  //console.log('tvdbApi from context:', tvdbApi);
  const response: LoginResponse = yield call(tvdbApi().fetchToken);
  if (response.error) {
    yield put({type: TvDbActionTypes.LOGIN_FAILURE});
    yield handleApiError(response.error);
    yield put(tvDbActions.isLoading(false));
  } else {
    yield put(tvDbActions.loginSuccess(response.token));
  }
}

export function* searchWatcher() {
  yield takeLatest(TvDbActionTypes.SEARCH_REQUEST, searchWorker);
}
function* searchWorker(action: PayloadAction<any, string>) {
  yield put(tvDbActions.isLoading(true));
  const tvdbApi = yield getContext('tvdbApi');
  const token = yield select((state: TvDbState) => state.token);
  const response: SearchResponse = yield call(
    tvdbApi().search,
    action.payload,
    token,
  );
  if (response.error) {
    yield handleApiError(response.error);
    yield put(tvDbActions.isLoading(false));
  } else {
    /* todo: should be some limitation to number of results, eg:
     yield put(tvDbActions.searchSuccess(response.data?.slice(0, 100)));
     */
    yield put(tvDbActions.searchSuccess(response.data));
  }
}

export function* fetchDetailsWatcher() {
  yield takeLatest(TvDbActionTypes.DETAILS_REQUEST, fetchDetailsWorker);
}
function* fetchDetailsWorker(action: PayloadAction<any, number>) {
  yield put(tvDbActions.isLoading(true));
  const tvdbApi = yield getContext('tvdbApi');
  const token = yield select((state: TvDbState) => state.token);
  const response: SeriesDetailsResponse = yield call(
    tvdbApi().details,
    action.payload,
    token,
  );
  if (response.error) {
    yield handleApiError(response.error);
    yield put(tvDbActions.isLoading(false));
  } else {
    yield put(tvDbActions.detailsSuccess(response.data));
  }
}

export function* tvDbSagas() {
  yield all([loginWatcher(), searchWatcher(), fetchDetailsWatcher()]);
}
