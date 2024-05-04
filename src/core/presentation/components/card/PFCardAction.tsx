import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Fonts from '../../../constants/Fonts';
import { SvgXml } from 'react-native-svg';
import { CustomText } from '../text/CustomText';
import arrow_setting_ico_content from '../../../../../assets/svg/xml/arrow_setting_ico_content';
import FontsSize from '../../../constants/FontsSize';
import { ThemeContext } from '../../contexts/theme/ThemeContext';

interface Props {
  item: any;
  disabled: boolean
  onPress: () => void;
}

const PFCardAction = ({ item, disabled, onPress }: Props) => {
  const { theme: { colors } } = useContext(ThemeContext);
  const fontSize = FontsSize._16_SIZE

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity disabled={disabled} onPress={onPress} >
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 50 }}>
            <SvgXml xml={item.icoItem} />
          </View>
          <View style={{ marginStart: 15 }}>
            <CustomText text={item.title} textColor={disabled ? colors.lightGray04 : undefined} fontFamily={Fonts.PoppinsMedium} textSize={fontSize} />
          </View>
          <View style={{ position: 'absolute', justifyContent: 'flex-end', right: 10 }}>
            <SvgXml xml={arrow_setting_ico_content} />
          </View>
        </View>
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 24,
    paddingTop: 16,
  },
});

export default PFCardAction;