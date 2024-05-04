import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Fonts from '../../../constants/Fonts';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
  showArrowBack?: boolean;
  setIconEnd?: any;
  elevation?: number,
  onPress?: () => void;
  backgroundColor?: string
  darkTheme?: boolean
  onPressIcoEnd?: () => void;
}

const Toolbar = ({ title, showArrowBack = true, elevation = 4, onPress, setIconEnd: showIconEnd, backgroundColor = "white", darkTheme = true, onPressIcoEnd }: Props) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onPress != undefined) {
      onPress();
      return;
    }
    navigation.goBack();
  };

  const handleIcoEndBackPress = () => {
    if (onPressIcoEnd != undefined) {
      onPressIcoEnd();
      return;
    }
    navigation.goBack();
  };

  let styleBar = {
    ...style.toolbarContainer,
    elevation,
    backgroundColor,

    ...(elevation !== 0 && {

      shadowColor: 'black',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    }),
  };

  return (
    <View style={{ ...styleBar, elevation, backgroundColor: backgroundColor }}>
      {showArrowBack && (
        <TouchableOpacity onPress={handleBackPress} style={style.backButton}>
          {/* <SvgXml xml={darkTheme ? arrow_back_chevron_ico_content : arrow_back_white_ico_content} /> */}
        </TouchableOpacity>
      )}
      <Text style={{ ...style.title, color: darkTheme ? "black" : "white" }}>{title}</Text>

      {showIconEnd && (
        <TouchableOpacity onPress={handleIcoEndBackPress} style={style.icoEnd}>
          <SvgXml xml={showIconEnd} />
        </TouchableOpacity>
      )}

    </View>
  );
};

const style = StyleSheet.create({
  toolbarContainer: {
    flexDirection: 'row',
    height: 56,
    width: '100%',
    justifyContent: 'center',


  },
  backButton: {
    marginStart: 20,
    position: 'absolute',
    padding: 10,
    alignSelf: 'center',
    left: 0,
  },
  icoEnd: {
    marginStart: 20,
    position: 'absolute',
    padding: 10,
    marginEnd: 16,
    alignSelf: 'center',
    right: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E2227',
    fontFamily: Fonts.PoppinsMedium,
    alignSelf: 'center',
  },
});

export default Toolbar;