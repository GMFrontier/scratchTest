import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '../../contexts/theme/ThemeContext';




interface Props {
  percentage: number;
  colorBar?: string

}

const ProgressIndicator = ({ percentage, colorBar }: Props) => {
  const { theme: { colors } } = useContext(ThemeContext);




  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 8,
      borderRadius: 10,
      backgroundColor: colors.disableText,

      overflow: 'hidden',
      justifyContent: 'center',
    },
    progressBar: {
      height: '100%',
      borderBottomRightRadius: 10,
      borderBottomEndRadius: 10,
      borderTopEndRadius: 10,
      backgroundColor: colorBar ? colorBar : colors.primary,
    }
  });

  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { width: `${percentage}%` }]} />
    </View>
  );
};



export default ProgressIndicator;
