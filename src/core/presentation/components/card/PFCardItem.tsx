import React, { useCallback, useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../text/CustomText';
import FontsSize from '../../../constants/FontsSize';
import { SvgXml } from 'react-native-svg';
import Fonts from '../../../constants/Fonts';
import CardSmallDigitalPF from '../../../../../assets/svg/card_small_digital_pf.svg';
import CardSmallPhysicalPF from '../../../../../assets/svg/card_small_physical_pf.svg';
import CardSmallDigitalCrypto from '../../../../../assets/svg/card_small_digital_crypto.svg';
import CardSmallPhysicalCrypto from '../../../../../assets/svg/card_small_physical_crypto.svg';
import mastercard_ico_content from '../../../../../assets/svg/xml/mastercard_ico_content';
import shipping_truck_black from '../../../../../assets/svg/xml/shipping_truck_black';
import approve_black from '../../../../../assets/svg/xml/approve_black';
import lock_black from '../../../../../assets/svg/xml/lock_black';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import arrow_right_black_content from '../../../../../assets/svg/xml/arrow_right_black_content';
import { PFCardModel } from '../../../../paguelo_facil/domain/entities/PFCardModel';
import { useTranslation } from '../../contexts/translations/LanguageProvider';
import StatusPFCard from './PFCardStatus';
import { DeliveryStatusType } from '../../../data/enum/DeliveryStatusType';
import { PfTypeCard } from '../../../data/enum/PfTypeCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NavigationService from '../../../../paguelo_facil/presentation/navigator/NavigatorService';
import { ROUTES } from '../../../../scratch/presentation/navigation/routes';
import { PFCardLockStatusType } from '../../../data/enum/PFCardLockStatusType';
import { BlockedPinLabel } from '../label/BlockedPinLabel';
import PfCardActionViewModel from '../../../../paguelo_facil/presentation/modules/logged_in/card/PFCardActions/PfCardActionViewModel';
import container from '../../../../paguelo_facil/presentation/di/inversify.config';
import { TYPES } from '../../../../paguelo_facil/presentation/di/types';
import dot_ico_cotentet from '../../../../../assets/svg/xml/dot_ico_cotentet';
import Sizebox from '../item/Sizebox';
import { BlurView } from '@react-native-community/blur';

interface Props {
  card: PFCardModel,
}

const PFCardItem = ({ card }: Props) => {
  const { translation } = useTranslation();
  const viewModel = container.get<PfCardActionViewModel>(
    TYPES.PfCardActionViewModel,
  );
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  var cardNum = ""
  var isPhysical: boolean
  var cardType: string
  var showBlurOpacity = false
  var lockedCardStatus: PFCardLockStatusType = card.status
  var activatedCard = true
  var deliveredCard = true


  const [cardPress, setCardPress] = useState(false);

  const idCard = card.idCard
  cardNum = card.visibleNum.substring(card.visibleNum.length - 4)
  isPhysical = card.additionalAttributes.card.physicalCard
  cardType = card.subType

  if (isPhysical) {
    activatedCard = card.activationDate != null
    if (!activatedCard) {
      deliveredCard = card.deliveryStatus == DeliveryStatusType.DELIVERED || card.additionalAttributes.deliveryAddress != null
      showBlurOpacity = true
    }
    else {
      if (lockedCardStatus == PFCardLockStatusType.LOCK)
        showBlurOpacity = true
    }
  }
  else {
    if (lockedCardStatus == PFCardLockStatusType.LOCK)
      showBlurOpacity = true
  }

  const handleRoutePFCardActionsScreen = (cardType: string, isPhysical: boolean, idCard: number, lockedCardStatus: PFCardLockStatusType) => {
    viewModel.setCard(card)

    NavigationService.navigate(ROUTES.Card.PFCardActionsScreen.name);
  };

  const originalWidth = 327;
  const originalHeight = 84;
  const aspectRatio = originalWidth / originalHeight;
  return (
    <View style={style.container}>
      <TouchableOpacity activeOpacity={1} onPressOut={() => { setCardPress(false), console.log("A") }} onPressIn={() => { setCardPress(true), console.log("B") }} onPress={() => handleRoutePFCardActionsScreen(cardType, isPhysical, idCard, lockedCardStatus)} >
        <View style={{ width: "100%", aspectRatio, opacity: showBlurOpacity ? 0.2 : 1, borderRadius: 14 }}>

          {isPhysical ?
            (<View>
              {
                cardType == PfTypeCard.PF_CARD ?
                  (
                    <CardSmallPhysicalPF width="100%" height="100%" viewBox={`0 0 ${originalWidth} ${originalHeight}`} />
                  ) : (<CardSmallPhysicalCrypto width="100%" height="100%" viewBox={`0 0 ${originalWidth} ${originalHeight}`} />)
              }
              <View style={{ position: 'absolute', left: 26, top: 15, flexDirection: "row" }}>
                <CustomText
                  textColor={colors.textColor01}
                  text={translation.file.physical}
                  textSize={FontsSize._14_SIZE}
                  fontFamily={Fonts.PoppinsMedium} />
                {card.pinErrors === 3 && <BlockedPinLabel />}
              </View>
            </View>
            ) : (<View>
              {cardType == PfTypeCard.PF_CARD ? (
                <CardSmallDigitalPF width="100%" height="100%" viewBox={`0 0 ${originalWidth} ${originalHeight}`} />
              ) : (<CardSmallDigitalCrypto width="100%" height="100%" viewBox={`0 0 ${originalWidth} ${originalHeight}`} />)
              }
              <View style={{ position: 'absolute', left: 26, top: 15, flexDirection: "row" }}>
                <CustomText
                  textColor={colors.textColor01}
                  text={translation.file.digital}
                  textSize={FontsSize._14_SIZE}
                  fontFamily={Fonts.PoppinsMedium} />
                {card.pinErrors === 3 && <BlockedPinLabel />}
              </View>
            </View>
            )}

          <View style={{ position: 'absolute', left: 25, bottom: 20, flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
            <SvgXml xml={mastercard_ico_content} />
            <Sizebox width={8}></Sizebox>
            <SvgXml xml={dot_ico_cotentet}></SvgXml>
            <Sizebox width={4}></Sizebox>
            <SvgXml xml={dot_ico_cotentet}></SvgXml>
            <Sizebox width={4}></Sizebox>
            <SvgXml xml={dot_ico_cotentet}></SvgXml>
            <Sizebox width={4}></Sizebox>
            <SvgXml xml={dot_ico_cotentet}></SvgXml>
            <Sizebox width={4}></Sizebox>
            <CustomText textColor={colors.textColor01} text={cardNum} textSize={FontsSize._16_SIZE} fontFamily={Fonts.PoppinsMedium}></CustomText>
          </View>
        </View>

        <View style={{ position: 'absolute', flexDirection: 'row', width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <View style={{ alignItems: 'center', right: '15%', marginTop: '9%' }}>

            <SvgXml xml={arrow_right_black_content} />

          </View>
        </View>

        {!deliveredCard ? (
          <StatusPFCard image={shipping_truck_black}
            message={translation.file.coordinate_card_delivery
            }
            marginStart={20} />
        ) : (<>
          {!activatedCard ? (
            <StatusPFCard image={approve_black}
              message={translation.file.activate_your_card_once_you_have_it
              }
              marginStart={10} />
          ) : (<>
            {lockedCardStatus == PFCardLockStatusType.LOCK ? (
              <StatusPFCard image={lock_black}
                message={translation.file.locked_card
                }
                marginStart={20} />
            ) : (<></>)}
          </>)}
        </>)
        }
      </TouchableOpacity>

      {cardPress ? <BlurView
        style={style.absolute}
        blurType="light"
        blurAmount={5}
        reducedTransparencyFallbackColor="white"
      /> : null}
    </View >
  )
};

const style = StyleSheet.create({

  container: {
    flex: 1,
    width: '100%',
    height: 'auto',

    elevation: 3,
    alignItems: 'flex-start',

    overflow: 'hidden',
    borderRadius: 14,
  }, absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',

    bottom: 0,
    right: 0,
    borderRadius: 20
  }

});

export default PFCardItem;