import {tvDbActions} from '../../src/state/actions';
import {tvDbSagas} from '../../src/state/sagas';
import {mockStore} from '../../_test_helpers/mockStore';
import {LoginResponse} from '../../src/api/tvdb/types';
import {AxiosError} from 'axios';
import {tvDbReducer} from '../../src/state/reducers';

describe('dataflow for login', () => {
  it('should dispatch a successful request to login', async () => {
    const loginSuccessResponse: LoginResponse = {
      token: 'token',
      error: undefined,
    };
    const tvdbApi = () => ({
      fetchToken: jest.fn().mockReturnValue(loginSuccessResponse),
    });
    const store = mockStore(tvDbReducer, tvdbApi, tvDbSagas);
    await store.dispatch(tvDbActions.loginRequest(null));
    expect(store.getActions()).toMatchSnapshot();
  });
  it('should dispatch a failing request to login', async () => {
    const loginFailingResponse: LoginResponse = {
      token: '',
      error: {} as AxiosError,
    };
    const tvdbApi = () => ({
      fetchToken: jest.fn().mockReturnValue(loginFailingResponse),
    });
    const store = mockStore({}, tvdbApi, tvDbSagas);
    await store.dispatch(tvDbActions.loginRequest(null));
    expect(store.getActions()).toMatchSnapshot();
  });
});
