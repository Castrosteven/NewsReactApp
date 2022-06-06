/* eslint-disable react-native/no-inline-styles */
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {TextInput, View} from 'react-native';
import {UseAricles} from '../contexts/UseArticle';

interface Props {
  setShowSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchComponent = ({}: Props) => {
  const {setSearchQuery, searchQuery} = UseAricles();
  const theme = useTheme();
  return (
    <View style={{width: '100%'}}>
      <TextInput
        placeholder="Search"
        value={searchQuery}
        onChangeText={e => {
          setSearchQuery(e);
        }}
        style={{
          color: theme.colors.text,
          backgroundColor: theme.colors.border,
          padding: 10,
          borderRadius: 10,
        }}
      />
    </View>
  );
};
