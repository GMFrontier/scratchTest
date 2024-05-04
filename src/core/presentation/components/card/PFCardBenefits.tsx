import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../text/CustomText';
import FontsSize from '../../../constants/FontsSize';
import { SvgXml } from 'react-native-svg';
import Fonts from '../../../constants/Fonts';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { useTranslation } from '../../contexts/translations/LanguageProvider';
import { PfTypeCard } from '../../../data/enum/PfTypeCard';
import creditcard_green_ico from '../../../../../assets/svg/xml/creditcard_green_ico';
import wallet_green_ico from '../../../../../assets/svg/xml/wallet_green_ico';
import dollar_green_ico from '../../../../../assets/svg/xml/dollar_green_ico';
import secure_green_ico from '../../../../../assets/svg/xml/secure_green_ico';
import withdrawal_green_ico from '../../../../../assets/svg/xml/withdrawal_green_ico';
import crypto_circle_green_ico from '../../../../../assets/svg/xml/crypto_circle_green_ico';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NavigationService from '../../../../paguelo_facil/presentation/navigator/NavigatorService';
import { CARDS_INFO } from '../../../constants/Preferences';
import { ROUTES } from '../../../../scratch/presentation/navigation/routes';
import dollar_info_screen from '../../../../../assets/svg/xml/dollar_info_screen';
import open_link_xml_content from '../../../../../assets/svg/xml/open_link_xml_content';

interface Props {
  isPhysical: boolean,
  cardType: string
}

const PFCardBenefits = ({ isPhysical, cardType }: Props) => {
  const { translation } = useTranslation();
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  var benefits = [
    {
      icon: creditcard_green_ico,
      detail: translation.file.immediate_approval_issuance
    }];

  if (!isPhysical)
    benefits = [...benefits, {
      icon: dollar_info_screen,
      detail: translation.file.no_issue_cost_or_monthly_payment
    }];
  else
    benefits = [...benefits, {
      icon: dollar_info_screen,
      detail: translation.file.only_pay_one_per_month_thats_all
    }];

  if (cardType == PfTypeCard.CRYPTO_CARD)
    benefits = [...benefits,
    {
      icon: crypto_circle_green_ico,
      detail: translation.file.prox_launch_crypto_wallet_pay_cryptos_card
    }]

  benefits = [...benefits,
  {
    icon: secure_green_ico,
    detail: translation.file.annual_antifraud_coverage
  }]
  if (!isPhysical)
    benefits = [...benefits,
    {
      icon: creditcard_green_ico,
      detail: translation.file.ideal_pay_your_subscriptions
    }]
  if (isPhysical) {
    if (cardType == PfTypeCard.PF_CARD)
      benefits = [...benefits,
      {
        icon: wallet_green_ico,
        detail: translation.file.greater_daily_monthly_fund_capacity_pf
      }]

    else
      benefits = [...benefits,
      {
        icon: wallet_green_ico,
        detail: translation.file.greater_daily_monthly_fund_capacity_crypto
      }]

    benefits = [...benefits,
    {
      icon: withdrawal_green_ico,
      detail: translation.file.three_atm_month_from_activation_card
    }

    ];
  }

  return (
    <View style={styles.cardContainer}>
      <CustomText textColor={colors.textColor01} text={isPhysical ? translation.file.physical_card : translation.file.digital_card} textSize={FontsSize._18_SIZE} fontFamily={Fonts.PoppinsMedium}></CustomText>
      <View style={{ marginTop: 16 }}></View>
      <CustomText textColor={colors.textColor01}
        text={translation.file.cost_per_month}
        textSize={FontsSize._15_SIZE} fontFamily={Fonts.PoppinsMedium}></CustomText>
      <View style={{ flexDirection: 'row', marginTop: 16 }}>
        <View style={{ justifyContent: 'flex-end', paddingBottom: 7 }}>
          <CustomText textColor={colors.textColor02} text='$' textSize={FontsSize._18_SIZE} fontFamily={Fonts.centraNo1Book}></CustomText>
        </View>
        <CustomText textColor={colors.textColor02} text={isPhysical ? '3,50' : '0'} textSize={FontsSize._36_SIZE} fontFamily={Fonts.centraNo1Book}></CustomText>
      </View>
      <View style={{ width: '100%' }}>
        <CustomText textColor={colors.textColor02}
          text={translation.file.benefits}
          textSize={FontsSize._14_SIZE} fontFamily={Fonts.PoppinsMedium}></CustomText>
      </View>

      {benefits.map((item, index) => {
        return (
          <View key={index} style={styles.boxContainer}>
            <SvgXml xml={item.icon} width={20} height={20} ></SvgXml>
            <View style={{ marginStart: 8, justifyContent: 'flex-start', alignSelf: 'center', marginEnd: 15 }}>
              <CustomText textColor={colors.textColor02} text={item.detail} textSize={FontsSize._14_SIZE} fontFamily={Fonts.PoppinsRegular}></CustomText>
            </View>
          </View>

        );
      }
      )}
      <View style={{ width: '100%', marginTop: 24, flexDirection: 'row', justifyContent: 'space-between' }}>
        <CustomText textColor={colors.textColor02}
          text={translation.file.for_more_information + ":"}
          textSize={FontsSize._14_SIZE} fontFamily={Fonts.PoppinsRegular}></CustomText>
        <TouchableOpacity onPress={() => {
          NavigationService.navigate(ROUTES.Common.WebViewScreen.name, {
            titleToShow: translation.file.benefits,
            urlToShow: CARDS_INFO,
          });
        }}>
          <View style={{ flexDirection: 'row' }}>
            <CustomText textColor={colors.primary} underline={true} text={translation.file.visit_this_link} textSize={FontsSize._14_SIZE} fontFamily={Fonts.PoppinsMedium}></CustomText>
            <SvgXml xml={open_link_xml_content}></SvgXml>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 'auto',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 10,
    shadowOpacity: 0.2,
    borderRadius: 16,
    marginTop: 24,

  }, boxContainer: {
    flexDirection: 'row',
    marginTop: 24,
    width: '100%',
  },
});

export default PFCardBenefits;