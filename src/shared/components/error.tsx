import React from 'react';
import {StyleSheet, View, Text, Modal} from 'react-native';

export interface Props {
  readonly message: string;
  readonly children?: React.ReactNode;
}

export const Error = (props: Props) => {
  return (
    <Modal
      visible={true}
      animationType={'fade'}
      presentationStyle={'overFullScreen'}
      transparent={true}>
      <View style={styles.fullscreen}>
        <View style={styles.content}>
          <Text style={styles.title}>Error!</Text>
          <Text style={styles.message}>{props.message}</Text>
          {props.children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  message: {
    color: 'gray',
  },
  title: {
    color: 'white',
    fontSize: 18,
    margin: 8,
  },
  fullscreen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignContent: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderColor: '#e0530c',
    borderWidth: 2,
    borderRadius: 20,
  },
});
