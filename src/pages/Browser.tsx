import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {RootStackParamList} from '../../App';
type Props = NativeStackScreenProps<RootStackParamList, 'Browser'>;

export const Browser = ({route}: Props) => {
  const {uri} = route.params;
  return (
    <View style={style.container}>
      <WebView source={{uri: uri}} style={style.webView} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {},
});
