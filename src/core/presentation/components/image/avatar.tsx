import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { SvgXml } from 'react-native-svg';
import FastImage from 'react-native-fast-image';


interface Props {
  uri?: string;
  name?: string
  width?: number,
  height?: number,
  svg?: any,
  stroke?: number,
  strokeColor?: string
}

export const AvatarImage = ({ uri, name, width = 80, height = 80, svg, stroke = 0, strokeColor }: Props) => {

  const { theme: { colors } } = useContext(ThemeContext);

  if (strokeColor == undefined || strokeColor == null) {
    strokeColor = colors.primary;
  }

  const [errorOccurred, setErrorOccurred] = useState(false);

  const handleImageError = () => {
    setErrorOccurred(true);
  };

  return (
    <View
      style={{
        ...styles.container,
        width: width,
        height: height,
        borderWidth: stroke,
        borderColor: strokeColor,
        borderRadius: height / 2
      }}
    >

      {errorOccurred && (
        <View style={styles.icon}>
          <Text style={styles.iconText}>{name}</Text>
        </View>
      )}

      {uri && !errorOccurred && <FastImage resizeMode={FastImage.resizeMode.contain} source={{ uri }} style={styles.image} onError={handleImageError} />}

      {!uri && svg && <SvgXml xml={svg} width="100%" height="100%" />}

      {!uri && !svg && (
        <View style={styles.icon}>
          <Text style={styles.iconText}>{name}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',

  },
  image: {
    width: '100%',
    height: '100%',

  },
  icon: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B8B8B8',
  },
});