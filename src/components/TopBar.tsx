/* eslint-disable react-native/no-inline-styles */
import {DrawerHeaderProps} from '@react-navigation/drawer';
import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SearchComponent} from './SearchComponent';

export const TopBar = ({navigation}: DrawerHeaderProps) => {
  const {colors} = useTheme();

  const [showSearchBar, setShowSearchBar] = useState(false);

  if (showSearchBar) {
    return (
      <View style={styles.topbar}>
        <TouchableOpacity
          onPress={() => setShowSearchBar(false)}
          style={{paddingRight: 5}}>
          <Icon name="arrow-left" size={30} color={colors.text} />
        </TouchableOpacity>
        <View style={{width: 300}}>
          <SearchComponent setShowSearchBar={setShowSearchBar} />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.topbar}>
        {navigation.canGoBack() ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={30} color={colors.text} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={30} color={colors.text} />
          </TouchableOpacity>
        )}
        <View>
          <Text style={{...styles.heading, color: colors.primary}}>
            The News
          </Text>
        </View>
        <Icon
          onPress={() => {
            setShowSearchBar(true);
          }}
          name="magnify"
          size={30}
          color={colors.text}
        />
      </View>
    );
  }
};
const styles = StyleSheet.create({
  topbar: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    // backgroundColor: '#ffffff',
    height: Platform.OS === 'ios' ? 100 : 50,
    paddingTop: Platform.OS === 'ios' ? 50 : 0,
    paddingRight: 20,
    paddingLeft: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBox: {
    width: '100%',
  },
  heading: {
    fontSize: 20,
    fontWeight: '500',
  },
});
