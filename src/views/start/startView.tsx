import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  TextInput,
  Button,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {tvDbActions} from '../../state/actions';
import {Error} from '../../shared/components/error';
import {TvDbState} from '../../state/reducers';
import {actionColor} from '../../shared/styles';
import {styles} from './styles';
import {SeriesDetails} from '../details/seriesDetailsView';
import {SearchItem} from './components/SearchItem';

const StartView = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [seriesId, setSeriesId] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const state = useSelector((s: TvDbState) => s);

  const handleItemPress = (itemId: number) => {
    setSeriesId(itemId);
    setShowDetails(true);
  };
  const handleLogin = () => {
    dispatch(tvDbActions.loginRequest(null));
  };
  useEffect(() => {
    handleLogin();
  }, [state.loginInit]);

  return (
    <View style={styles.body}>
      <TextInput
        style={styles.searchBox}
        placeholder={'Search'}
        returnKeyType={'search'}
        onChangeText={(text: string) => setQuery(text)}
        onSubmitEditing={() => dispatch(tvDbActions.searchRequest(query))}
        autoCorrect={false}
      />
      {showDetails ? (
        <SeriesDetails
          seriesId={seriesId}
          onClose={() => setShowDetails(false)}
          visible={showDetails}
        />
      ) : null}
      {state.loginError && (
        <Error message={'Login failure'}>
          <Button
            onPress={() => handleLogin()}
            title="Try again"
            color={actionColor}
            accessibilityLabel="Try login"
          />
        </Error>
      )}
      {state.apiError?.error && (
        <Error message={state.apiError.message}>
          <Button
            onPress={() =>
              dispatch(tvDbActions.apiError({error: false, message: ''}))
            }
            title="Close"
            color={actionColor}
            accessibilityLabel="Close error"
          />
        </Error>
      )}
      {state.isLoading ? (
        <ActivityIndicator
          size="large"
          color="white"
          style={{flex: 1, alignSelf: 'center'}}
        />
      ) : (
        <FlatList
          style={{marginTop: 10}}
          data={state.searchResult}
          keyExtractor={(item) => item.id.toString()}
          //renderItem={(item) => ItemView(item.item)}
          renderItem={(item) => (
            <SearchItem item={item.item} handleItemPress={handleItemPress} />
          )}
        />
      )}
    </View>
  );
};

export default StartView;
