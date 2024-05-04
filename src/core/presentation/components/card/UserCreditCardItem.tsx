import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../text/CustomText';
import FontsSize from '../../../constants/FontsSize';
import { SvgXml } from 'react-native-svg';
import Fonts from '../../../constants/Fonts';
import visa_ico_content from '../../../../../assets/svg/xml/visa_ico_content';
import mc_ico_content from '../../../../../assets/svg/xml/mc_ico_content';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { CreditCardModel } from '../../../../paguelo_facil/domain/entities/CreditCardModel';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import NavigationService from '../../../../paguelo_facil/presentation/navigator/NavigatorService';
import { ROUTES } from '../../../../scratch/presentation/navigation/routes';
import arrow_right_black_content from '../../../../../assets/svg/xml/arrow_right_black_content';
import clock_sand_timer_content from '../../../../../assets/svg/xml/clock_sand_timer_content';
import { useTranslation } from '../../contexts/translations/LanguageProvider';
import { BlurView } from '@react-native-community/blur';
import Sizebox from '../item/Sizebox';
import dot_ico_cotentet from '../../../../../assets/svg/xml/dot_ico_cotentet';
import { Checkbox } from '../checkbox/Checkbox';
import { RowTextComponent } from '../text/RowTextComponent';
import visa_ico_content_big from '../../../../../assets/svg/xml/visa_ico_content_big';
import mc_ico_content_big from '../../../../../assets/svg/xml/mc_ico_content_big';
import visa_ico_content_big_blue from '../../../../../assets/svg/xml/visa_ico_content_big_blue';
import arrow_indicator_card_home from '../../../../../assets/svg/xml/arrow_indicator_card_home';
import arrow_back_chevron_ico_content from '../../../../../assets/svg/xml/arrow_back_chevron_ico_content';
import check_box_inactive_circle_content from '../../../../../assets/svg/xml/check_ico_inactive_circle_content';

interface Props {
  item: CreditCardModel,
}

const UserCreditCardItem = ({ item }: Props) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);


  const handleOnPressCard = () => {
    NavigationService.navigate(ROUTES.ExternalCard.ExternalCardValidationScreen.name, {
      args: item
    });
  };

  const { translation } = useTranslation();

  return (
    <TouchableOpacity onPress={handleOnPressCard} activeOpacity={0.9}>
      <View style={style.containerBlur}>

        <View style={{ position: 'absolute', right: 16, alignSelf: 'center' }}>
          <SvgXml xml={arrow_right_black_content}></SvgXml>
        </View>

        <View style={{ ...style.creditCard, }} pointerEvents='none'>



          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

              {item.regCard?.cardType == 'VISA' ? <SvgXml xml={visa_ico_content_big_blue} /> : <SvgXml xml={mc_ico_content_big} />}
              <Sizebox width={5}></Sizebox>
              <SvgXml xml={dot_ico_cotentet}></SvgXml>
              <Sizebox width={5}></Sizebox>
              <SvgXml xml={dot_ico_cotentet}></SvgXml>
              <Sizebox width={5}></Sizebox>
              <SvgXml xml={dot_ico_cotentet}></SvgXml>
              <Sizebox width={5}></Sizebox>
              <SvgXml xml={dot_ico_cotentet}></SvgXml>
              <Sizebox width={8}></Sizebox>
              <CustomText text={item.regCard?.visibleNum.substring(item.regCard.visibleNum.length - 4) ?? ''} fontFamily={Fonts.PoppinsMedium} textSize={FontsSize._16_SIZE}></CustomText>
            </View>


          </View>
          <Sizebox height={15}></Sizebox>
          <CustomText text={item.nickName} fontFamily={Fonts.PoppinsRegular}></CustomText>


        </View>

        {item.verifiedDate == null ? <View style={{ flexDirection: 'row', position: 'absolute', alignItems: 'center', alignSelf: 'center', marginStart: 24 }}>
          <SvgXml xml={clock_sand_timer_content}></SvgXml>
          <Sizebox width={10}></Sizebox>
          <CustomText
            text={translation.file.card_to_be_validated}
            textColor={colors.textColor01}
            textSize={FontsSize._14_SIZE}
            fontFamily={Fonts.encodesansMedium} />
        </View> : null}
      </View>
    </TouchableOpacity>

  )
};

const style = StyleSheet.create({

  containerBlur: {

    overflow: "hidden",
    borderColor: '#C3C8D3',
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 18,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
    margin: 1

  }, absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 'auto',
    width: 'auto',
    bottom: 0,
    right: 0,
    borderRadius: 8
  },
  cardContainer: {
    flexDirection: 'row',
    padding: 18,
    elevation: 4,
    marginBottom: 16,
    margin: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,

  }, creditCard: {













  }

});

export default UserCreditCardItem;