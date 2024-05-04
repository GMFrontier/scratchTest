import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import Fonts from '../../../constants/Fonts';
import FastImage from 'react-native-fast-image';
import { SvgXml } from 'react-native-svg';

interface Props {
  uri?: string;
  source?: any;
  name?: string;
  width?: number;
  height?: number;
  stroke?: number;
  strokeColor?: string;
  backgroundColor?: string;
  fontSize?: number,
  showBackgroundsSvg?: boolean
}

export const UserAvatar = ({ uri, name, width = 80, height = 80, stroke = 0, strokeColor, backgroundColor, source, fontSize = 18, showBackgroundsSvg }: Props) => {
  const { theme: { colors } } = useContext(ThemeContext);
  strokeColor = strokeColor || colors.primary;
  const [errorOccurred, setErrorOccurred] = useState(false);



  const handleImageError = () => {
    setErrorOccurred(true);
  };

  const renderAvatarContent = () => {

    if (source) {


      if (showBackgroundsSvg) {

        return <View style={{ backgroundColor: backgroundColor ? backgroundColor : 'transparent', padding: 10, borderRadius: 50 }}>
          <SvgXml xml={source}></SvgXml>
        </View>
      }

      return <SvgXml xml={source}></SvgXml>
    }
    if (errorOccurred || !uri) {
      return (
        <View style={[styles.icon, { backgroundColor: backgroundColor || colors.primary, borderWidth: stroke, borderColor: strokeColor }]}>
          <Text style={{ ...styles.iconText, fontSize: fontSize }}>{name}</Text>
        </View>
      );
    } else {
      return <FastImage source={{ uri }} resizeMode={FastImage.resizeMode.contain} style={styles.image} onError={handleImageError} />;
    }
  };

  return (
    <View style={{ ...styles.container, width, height, borderRadius: height / 2 }}>
      {renderAvatarContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  icon: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {

    fontWeight: 'bold',
    fontFamily: Fonts.PoppinsMedium,
    color: 'white',
  },
});
