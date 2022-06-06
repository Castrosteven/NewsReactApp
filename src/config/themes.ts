import {Theme} from '@react-navigation/native';

export const MyDarkTheme: Theme = {
  dark: true,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: '#232323',
    card: '#232323',
    text: '#FAFAFB',
    border: '#616161',
    notification: 'rgb(255, 69, 58)',
  },
};
export const MyLightTheme: Theme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: '#FEFEFE',
    card: '#FEFEFE',
    text: '#232323',
    border: '#F5F5F5',
    notification: 'rgb(255, 69, 58)',
  },
};
