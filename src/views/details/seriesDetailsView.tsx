import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  ScrollView,
  Button,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TvDbState} from '../../state/reducers';
import {tvDbActions} from '../../state/actions';
import {actionColor} from '../../shared/styles';

export interface Props {
  readonly seriesId: number;
  readonly onClose: any;
  readonly visible: boolean;
}

export const SeriesDetails = (props: Props) => {
  const dispatch = useDispatch();
  const {seriesDetails, isLoading} = useSelector((s: TvDbState) => s);
  useEffect(() => {
    dispatch(tvDbActions.detailsRequest(props.seriesId));
  }, [props.seriesId]);
  return (
    <Modal
      visible={props.visible}
      animationType={'slide'}
      presentationStyle={'overFullScreen'}
      transparent={true}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="white"
          style={{flex: 1, alignSelf: 'center'}}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.fullscreen}>
          <Text style={styles.title}>{seriesDetails?.seriesName}</Text>
          <Text style={styles.text}>{seriesDetails?.rating}</Text>
          <Text style={styles.text}>{seriesDetails?.overview}</Text>
          <Button
            onPress={() => props.onClose()}
            title="Close"
            color={actionColor}
            accessibilityLabel="Close"
          />
        </ScrollView>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  text: {
    width: '90%',
    color: 'lightgray',
    padding: 10,
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 1,
  },
  title: {
    color: 'white',
    fontSize: 18,
    margin: 8,
    alignSelf: 'center',
  },
  fullscreen: {
    flex: 1,
    backgroundColor: 'black',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
