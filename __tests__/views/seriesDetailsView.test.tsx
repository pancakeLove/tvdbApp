import React from 'react';
import {create} from 'react-test-renderer';
import {Provider} from 'react-redux';
import {mockStore} from '../../_test_helpers/mockStore';
import {tvDbReducer} from '../../src/state/reducers';
import {tvDbSagas} from '../../src/state/sagas';
import {SeriesDetails as SeriesDetailsView} from '../../src/views/details/seriesDetailsView';
import {
  LoginResponse,
  SearchResponse,
  SeriesDetails,
  SeriesDetailsResponse,
} from '../../src/api/tvdb/types';
import {Button} from 'react-native';

describe('DetailsView', async () => {
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
  const onCloseCallback = jest.fn();

  await test('testing close button', async () => {
    let tree = create(
      <Provider store={store}>
        <SeriesDetailsView
          seriesId={1}
          visible={true}
          onClose={onCloseCallback}
        />
      </Provider>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
