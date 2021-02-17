import React from 'react';
import {create} from 'react-test-renderer';
import {Provider} from 'react-redux';
import {mockStore} from '../../_test_helpers/mockStore';
import {tvDbReducer} from '../../src/state/reducers';
import {tvDbSagas} from '../../src/state/sagas';
import StartView from '../../src/views/start/startView';
import {
  LoginResponse,
  SearchResponse,
  SeriesDetails,
  SeriesDetailsResponse,
} from '../../src/api/tvdb/types';

describe('StartView', async () => {
  const detailsSuccessResponse: SeriesDetailsResponse = {
    data: {} as SeriesDetails,
    error: undefined,
  };
  const loginSuccessResponse: LoginResponse = {
    token: 'token',
    error: undefined,
  };
  const searchSuccessResponse: SearchResponse = {
    data: {} as any,
    error: undefined,
  };
  const tvdbApi = () => ({
    details: jest.fn().mockReturnValue(detailsSuccessResponse),
    fetchToken: jest.fn().mockReturnValue(loginSuccessResponse),
    search: jest.fn().mockReturnValue(searchSuccessResponse),
  });
  const store = mockStore(tvDbReducer, tvdbApi, tvDbSagas);

  await test('testing render', async () => {
    let tree = await create(
      <Provider store={store}>
        <StartView />
      </Provider>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
