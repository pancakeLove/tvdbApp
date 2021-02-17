import {tvDbActions} from '../../src/state/actions';
import {tvDbSagas} from '../../src/state/sagas';
import {mockStore} from '../../_test_helpers/mockStore';
import {SearchResponse} from '../../src/api/tvdb/types';
import {AxiosError} from 'axios';

describe('dataflow for search', () => {
  it('should dispatch a successful request to search', async () => {
    const searchSuccessResponse: SearchResponse = {
      data: {} as any,
      error: undefined,
    };
    const tvdbApi = () => ({
      search: jest.fn().mockReturnValue(searchSuccessResponse),
    });
    const store = mockStore({}, tvdbApi, tvDbSagas);
    await store.dispatch(tvDbActions.searchRequest('query'));
    expect(store.getActions()).toMatchSnapshot();
  });
  it('should dispatch a failing request to search', async () => {
    const searchSuccessResponse: SearchResponse = {
      data: undefined as any,
      error: {} as AxiosError,
    };
    const tvdbApi = () => ({
      search: jest.fn().mockReturnValue(searchSuccessResponse),
    });
    const store = mockStore({}, tvdbApi, tvDbSagas);
    await store.dispatch(tvDbActions.searchRequest('query'));
    expect(store.getActions()).toMatchSnapshot();
  });
});
