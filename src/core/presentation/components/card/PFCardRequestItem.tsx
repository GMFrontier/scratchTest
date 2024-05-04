import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../text/CustomText';
import FontsSize from '../../../constants/FontsSize';
import { SvgXml } from 'react-native-svg';
import Fonts from '../../../constants/Fonts';
import CardSmallDigitalPF from '../../../../../assets/svg/card_small_digital_pf.svg';
import CardSmallPhysicalPF from '../../../../../assets/svg/card_small_physical_pf.svg';
import CardSmallDigitalCrypto from '../../../../../assets/svg/card_small_digital_crypto.svg';
import CardSmallPhysicalCrypto from '../../../../../assets/svg/card_small_physical_pf.svg';
import mastercard_ico_content from '../../../../../assets/svg/xml/mastercard_ico_content';
import hourglass_black from '../../../../../assets/svg/xml/hourglass_black';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import arrow_right_black_content from '../../../../../assets/svg/xml/arrow_right_black_content';
import { RequestCardModel } from '../../../../paguelo_facil/domain/entities/RequestCardModel';
import { useTranslation } from '../../contexts/translations/LanguageProvider';
import StatusPFCard from './PFCardStatus';
import { PfTypeCard } from '../../../data/enum/PfTypeCard';

interface Props {
  requestCard: RequestCardModel
}

const PFCardRequestItem = ({ requestCard }: Props) => {
  const { translation } = useTranslation();
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  var isPhysical
  var cardType

  isPhysical = requestCard.requestCard.isPhysical
  cardType = requestCard.requestCard.cardType

  const originalWidth = 327;
  const originalHeight = 84;
  const aspectRatio = originalWidth / originalHeight;

  return (
    <View style={style.container} >
      <View style={{ width: "100%", aspectRatio, opacity: 0.2, borderRadius: 14 }}>

        {isPhysical ? (<View>
          {
            cardType == PfTypeCard.PF_CARD ? (
              <CardSmallPhysicalPF width="100%" height="100%" viewBox={`0 0 ${originalWidth} ${originalHeight}`} />
            ) : (<CardSmallPhysicalCrypto width="100%" height="100%" viewBox={`0 0 ${originalWidth} ${originalHeight}`} />)
          }
          <View style={{ position: 'absolute', left: 26, top: 25 }}>
            <CustomText textColor={colors.textColor01} text={translation.file.physical
            } textSize={FontsSize._14_SIZE} fontFamily={Fonts.PoppinsMedium}></CustomText>

          </View>
        </View>
        ) : (<View>
          {cardType == PfTypeCard.PF_CARD ? (
            <CardSmallDigitalPF width="100%" height="100%" viewBox={`0 0 ${originalWidth} ${originalHeight}`} />
          ) : (<CardSmallDigitalCrypto width="100%" height="100%" viewBox={`0 0 ${originalWidth} ${originalHeight}`} />)
          }
          <View style={{ position: 'absolute', left: 26, top: 25 }}>
            <CustomText textColor={colors.textColor01} text={translation.file.digital
            } textSize={FontsSize._14_SIZE} fontFamily={Fonts.PoppinsRegular}></CustomText>
          </View>
        </View>
        )}
        <View style={{ position: 'absolute', right: 90, bottom: 20 }}>
          <SvgXml xml={mastercard_ico_content} />
        </View>
      </View>

      <View style={{ position: 'absolute', flexDirection: 'row', width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <View style={{ alignItems: 'center', right: '15%', marginTop: '9%' }}>
          <SvgXml xml={arrow_right_black_content} />
        </View>
      </View>
      {requestCard !== undefined ? (
        <StatusPFCard image={hourglass_black}
          message={translation.file.continue_card_request
          }
          marginStart={20} />
      ) : (<></>
      )
      }
    </View >
  )
};

const style = StyleSheet.create({

  container: {
    flex: 1,
    width: '100%',
    height: 'auto',
    backgroundColor: 'white',
    elevation: 3,
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderRadius: 14,
  },

});

export default PFCardRequestItem;