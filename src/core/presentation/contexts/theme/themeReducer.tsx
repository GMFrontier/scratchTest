import { Theme } from '@react-navigation/native';

type ThemeAction = { type: 'set_light_theme' } | { type: 'set_dark_theme' };

export interface ThemeState extends Theme {
  currentTheme: 'light' | 'dark';
  dividerColor: string;
  snackbarYellow: string;
  errorColor: string;
  colors: {
    title: string;
    primaryText: string;
    defaultTextButton: string;
    captionText: string;
    disableText: string;
    whiteText: string;
    secondaryText: string;
    primary: string;
    secondary: string;
    tertiary: string;
    accent: string;
    accentSecondary: string;
    blue50: string;
    blu100: string;
    blue200: string;
    red500: string;
    green400: string;
    //viejos
    alertColor: string;
    background: string;
    textColor01: string;
    textColor02: string;
    textColor03: string;
    textColor04: string;
    red07: string;
    yellow06: string;
    yellow03: string;
    secondaryYellow02: string;
    green07: string;
    green08: string;
    darkGray02: string;
    darkGray06: string;
    lightGray01: string;
    lightGray04: string;
    lightGray04Pressed: string;
    lightGray05: string;
    lightGray06: string;
    disabledBgPrimaryButton: string;
    disabledTextPrimaryButton: string;
    secondaryBlue03: string,
    secondaryOrange02: string,
    secondaryOrange07: string,
    backgroundInputGreen: string,
    transparent: string;
    background01primary: string;
    secondaryBlue07: string;
    neutralDarkGray01: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    white: string;
    black: string;
    neutralColorDarkGray05: string;
    colorBlueCardOne: string;
    colorBlueCardTwo: string;
    colorGrayCardDefault: string;
    colorBlueGrayCard: string;
    colorOrangeCardOne: string;
    colorOrangeCardTwo: string;
    colorOrangeCardThree: string;
    green01: string,
    blue: string,
    blue02: string,
    red03: string,
    secondaryOrange06: string
  };
}

export const lightTheme: ThemeState = {
  currentTheme: 'light',
  dividerColor: 'rgba(0,0,0,0.7)',
  snackbarYellow: '#FFC400',
  errorColor: '#E11900',
  dark: false,
  colors: {
    title: "#17233D",
    primaryText: "#515A6E",
    defaultTextButton: "#263137",
    captionText: "#808695",
    disableText: "#C4C4C4",
    whiteText: "#FFFFFF",
    secondaryText: "#EBECF0",
    primary: "#282828",
    secondary: "#7A9CFF",
    tertiary: "#404040",
    accent: "#282828",
    accentSecondary: "#2C2C2E",
    blue50: "#B8CAFF",
    blu100: "#A3BAFF",
    blue200: "#7A9CFF",
    red500: "#F33A00",
    green400: "#6ABD67",
    //viejos
    alertColor: '#E11900',
    background: 'white',
    textColor01: '#1E2227',
    textColor02: '#3D444F',
    yellow06: '#D69E2E',
    yellow03: '#EDB600',
    secondaryYellow02: '#FFF6CC',
    textColor03: '#515A69',
    background01primary: '#F2F3F5',
    textColor04: '#7D889B',
    red07: '#E53E3E',
    red03: '#FED7D7',
    green01: '#F4FCE3',
    green07: '#4CA80B',
    green08: '#30850F',
    lightGray01: '#ADB4C1',
    blue: '#2A5CB6',
    secondaryBlue03: '#CDDCF7',
    darkGray02: '#A6ADBA',
    darkGray06: '#515A69',
    lightGray04: '#D7DAE0',
    lightGray04Pressed: '#F6F7F8',
    neutralDarkGray01: '#C4C9D1',
    lightGray05: '#E0E3E7',
    lightGray06: '#E9EBEE',
    disabledBgPrimaryButton: '#D7DAE0',
    disabledTextPrimaryButton: '#515A69',
    secondaryBlue07: '#3A74DE',
    secondaryOrange02: '#FFF6D6',
    secondaryOrange07: '#663800',
    backgroundInputGreen: '#e8eee0',
    transparent: 'transparent',
    card: 'white',
    text: 'black',
    border: 'white',
    notification: 'white',
    blue02: '#E6EDFB',
    white: 'white',
    black: 'black',
    neutralColorDarkGray05: '#657184',
    colorBlueCardOne: '#0B72D0',
    colorBlueCardTwo: '#00199B',
    colorGrayCardDefault: '#CBCFD7',
    colorBlueGrayCard: '#9CBFE8',
    colorOrangeCardOne: '#ED9C00',
    colorOrangeCardTwo: '#C57226',
    colorOrangeCardThree: '#F5D49B',
    secondaryOrange06: '#ED8936'
  },
};

export const themeReducer = (
  state: ThemeState,
  action: ThemeAction,
): ThemeState => {
  switch (action.type) {
    case 'set_light_theme':
      return { ...lightTheme };
      break;
    default:
      return state;
  }
};
