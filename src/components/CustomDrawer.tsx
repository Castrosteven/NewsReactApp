import React from 'react';
import {View, Switch, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {useTheme} from '@react-navigation/native';
interface Props extends DrawerContentComponentProps {
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

export const CustomDrawer = ({
  toggleTheme,
  isDarkTheme,
  state,
  navigation,
}: Props) => {
  const colors = useTheme();
  const routes = state.routes;

  return (
    <DrawerContentScrollView>
      <DrawerItem
        label={routes[0].name}
        onPress={() => {
          navigation.navigate(routes[0].name);
        }}
        icon={() => {
          return <Icon name="home" size={30} color={colors.colors.text} />;
        }}
      />

      <View style={styles.container}>
        {isDarkTheme ? (
          <Icon
            name="weather-night"
            size={30}
            color={colors.colors.text}
            style={{paddingRight: 30}}
          />
        ) : (
          <Icon
            name="white-balance-sunny"
            size={30}
            color={colors.colors.text}
            style={{paddingRight: 30}}
          />
        )}

        <Switch
          trackColor={{false: '#767577', true: `${colors.colors.primary}`}}
          thumbColor={!isDarkTheme ? '#fefefe' : '#232323'}
          ios_backgroundColor={`${colors.colors.primary}`}
          onValueChange={toggleTheme}
          value={isDarkTheme}
        />
      </View>
    </DrawerContentScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 15,
  },
});
