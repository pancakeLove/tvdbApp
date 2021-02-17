import React from 'react';
import {SearchResultItem} from '../../../api/tvdb/types';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from '../styles';

export interface Props {
  readonly item: SearchResultItem;
  readonly handleItemPress: (id: number) => void;
}

export const SearchItem = ({item, handleItemPress}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => handleItemPress(item.id)}
      style={styles.listItem}>
      <Text style={styles.itemText}>{item.seriesName}</Text>
      <Text style={styles.itemText}>{item.network}</Text>
    </TouchableOpacity>
  );
};
