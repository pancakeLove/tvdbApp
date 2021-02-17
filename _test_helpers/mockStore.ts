import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';

export const mockStore = (state: Object, tvdbApi: any, saga: any) => {
  const context = {
    tvdbApi,
  };
  const sagaMiddleware = createSagaMiddleware();
  sagaMiddleware.setContext(context);
  const mockStore = configureMockStore([sagaMiddleware]);
  const store = mockStore(state);
  sagaMiddleware.run(saga);
  return {...store};
};
