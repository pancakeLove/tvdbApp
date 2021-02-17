/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
} from 'react-native';

import StartView from './src/views/start/startView';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {tvDbReducer} from './src/state/reducers';
import {tvDbSagas} from './src/state/sagas';
import {Provider} from 'react-redux';
import {tvdbApi} from './src/api/tvdb/tvdbApi';

const App = () => {
  const sagaMiddleware = createSagaMiddleware();
  sagaMiddleware.setContext({
    tvdbApi,
  });
  let store = createStore(
    tvDbReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(tvDbSagas);

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Provider store={store}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{flex: 1}}>
          <StartView />
        </SafeAreaView>
      </Provider>
    </View>
  );
};

export default App;
