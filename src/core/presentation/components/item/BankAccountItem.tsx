import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../text/CustomText';
import FontsSize from '../../../constants/FontsSize';
import Fonts from '../../../constants/Fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NavigationService from '../../../../paguelo_facil/presentation/navigator/NavigatorService';
import { ROUTES } from '../../../../scratch/presentation/navigation/routes';
import { SvgXml } from 'react-native-svg';
import arrow_setting_ico_content from '../../../../../assets/svg/xml/arrow_setting_ico_content';
import { BankItem } from '../../../../paguelo_facil/domain/entities/BankResponse';
import { UserAvatar } from '../image/UserAvatar';
import { getSimpleName } from '../../../../paguelo_facil/domain/entities/FastActionsResponseModel';
import { ThemeContext } from '../../contexts/theme/ThemeContext';

interface Props {
  item: BankItem,
  setBankSelected: any,
}

const BankAccountItem = ({ item, setBankSelected }: Props) => {


  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const backgroundColor = isPressed ? colors.lightGray04Pressed : 'transparent';

  return (

    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => {

        setBankSelected(item);
        NavigationService.navigate(ROUTES.Home.BankTransfersAmountScreen.name)

      }}
      activeOpacity={1}
      style={[style.itemContainer, { backgroundColor }]}
    >
      <View>
        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            <UserAvatar
              uri={undefined}
              name={getSimpleName(item.nameAccount)}
              width={48}
              height={48}
              stroke={2}
              backgroundColor={colors.green07}
              strokeColor={colors.green07} />

            <View style={{ marginStart: 10 }}>
              <CustomText text={item.nameAccount ?? ''} fontFamily={Fonts.PoppinsMedium} textSize={FontsSize._16_SIZE} textColor={colors.textColor01} />
              <CustomText text={item.bank.bankName} fontFamily={Fonts.PoppinsRegular} textSize={FontsSize._13_SIZE} textColor={colors.textColor04} />
              <CustomText text={item.numAccount} fontFamily={Fonts.PoppinsRegular} textSize={FontsSize._13_SIZE} textColor={colors.textColor04} />
            </View>
          </View>
          <SvgXml xml={arrow_setting_ico_content} />
        </View>


        <View style={{ backgroundColor: colors.lightGray04, width: '100%', height: 1, marginTop: 16, marginBottom: -15 }}></View>
      </View>
    </TouchableOpacity>


  );
};

const style = StyleSheet.create({

  buttonIcoContainer: {
    borderRadius: 12,
    marginEnd: 16,
    justifyContent: 'center',

  },
  itemContainer: {
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});

export default BankAccountItem;