import {tvDbActions} from '../../src/state/actions';
import {tvDbSagas} from '../../src/state/sagas';
import {mockStore} from '../../_test_helpers/mockStore';
import {
  SeriesDetails,
  SeriesDetailsResponse,
} from '../../src/api/tvdb/types';
import {AxiosError} from 'axios';

describe('dataflow for fetching details', () => {
  it('should dispatch a successful request to fetch details', async () => {
    const detailsSuccessResponse: SeriesDetailsResponse = {
      data: {} as SeriesDetails,
      error: undefined,
    };
    const tvdbApi = () => ({
      details: jest.fn().mockReturnValue(detailsSuccessResponse),
    });
    const store = mockStore({}, tvdbApi, tvDbSagas);
    await store.dispatch(tvDbActions.detailsRequest(1));
    expect(store.getActions()).toMatchSnapshot();
  });
  it('should dispatch a failing request to fetch details', async () => {
    const detailsFailsResponse: SeriesDetailsResponse = {
      data: {} as SeriesDetails,
      error: {} as AxiosError,
    };
    const tvdbApi = () => ({
      search: jest.fn().mockReturnValue(detailsFailsResponse),
    });
    const store = mockStore({}, tvdbApi, tvDbSagas);
    await store.dispatch(tvDbActions.searchRequest('query'));
    expect(store.getActions()).toMatchSnapshot();
  });
});
