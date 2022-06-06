import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from './src/pages/HomeScreen';
import {ArticlWrapper} from './src/contexts/UseArticle';
import {Browser} from './src/pages/Browser';
import {TopBar} from './src/components/TopBar';
import {StatusBar, useColorScheme} from 'react-native';
import {CustomDrawer} from './src/components/CustomDrawer';
import {MyDarkTheme, MyLightTheme} from './src/config/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

export type RootStackParamList = {
  Main: {};
  Browser: {
    uri: string;
  };
};

const MyDrawer = ({
  toggleTheme,
  isDarkTheme,
}: {
  toggleTheme: () => void;
  isDarkTheme: boolean;
}) => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => (
        <CustomDrawer
          isDarkTheme={isDarkTheme}
          toggleTheme={toggleTheme}
          {...props}
        />
      )}
      screenOptions={{
        header: props => <TopBar {...props} />,
        headerShown: true,
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen
        name="Browser"
        component={Browser}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
    </Drawer.Navigator>
  );
};

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = async () => {
    try {
      setIsDarkTheme(!isDarkTheme);
      await AsyncStorage.setItem('@isDarkTheme', `${!isDarkTheme}`);
    } catch (error) {}
  };
  const scheme = useColorScheme();
  useEffect(() => {
    const fetchStorage = async () => {
      try {
        const value = await AsyncStorage.getItem('@isDarkTheme');
        if (value === 'true') {
          setIsDarkTheme(true);
        } else {
          setIsDarkTheme(false);
        }
      } catch (error) {}
    };
    fetchStorage();
  }, []);

  return (
    <ArticlWrapper>
      <StatusBar
        backgroundColor={isDarkTheme ? '#232323' : '#FEFEFE'}
        barStyle={
          isDarkTheme || scheme === 'dark' ? 'light-content' : 'dark-content'
        }
      />
      <NavigationContainer
        theme={isDarkTheme || scheme === 'dark' ? MyDarkTheme : MyLightTheme}>
        <MyDrawer toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
      </NavigationContainer>
    </ArticlWrapper>
  );
};

export default App;
