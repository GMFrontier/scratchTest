import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import { toMoneyFormat } from '../../../../core/data/utils/Utils';
import Fonts from '../../../../core/constants/Fonts';

interface Props {
  total: number,
  spent: number
}

const BalanceProgress = ({ total, spent }: Props) => {
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
      backgroundColor: colors.blue400,
    }
  });

  const percentage = spent / total * 100
  return (
    <View>
      <View style={styles.container}>
        <View style={[styles.progressBar, { width: `${percentage}%` }]} />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
        <CustomText
          marginTop={5}
          textColor={colors.white}
          fontFamily={Fonts.DMSansMedium}
          text={'Gastado: ' + toMoneyFormat(spent)} />
        <CustomText
          marginTop={5}
          textColor={colors.white}
          fontFamily={Fonts.DMSansMedium}
          text={'Total: ' + toMoneyFormat(total)} />
      </View>
    </View>
  );
};

export default BalanceProgress;
