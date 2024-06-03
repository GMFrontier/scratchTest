import { useContext } from 'react';
import { View } from 'react-native';
import { AvatarImage } from '../../../../core/presentation/components/image/avatar';
import Sizebox from '../../../../core/presentation/components/item/Sizebox';
import FontsSize from '../../../../core/constants/FontsSize';
import ic_avatar_empty_profile from '../../../../../assets/svg/ic_avatar_empty_profile';
import { SvgXml } from 'react-native-svg';
import ic_info_blue_dark_filled from '../../../../../assets/svg/ic_info_blue_dark_filled';
import ic_eye_open_outline from '../../../../../assets/svg/ic_eye_open_outline';
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import Fonts from '../../../../core/constants/Fonts';
import { ButtonLink } from '../../../../core/presentation/components/button/ButtonLink';
import ic_card_outline from '../../../../../assets/svg/ic_card_outline';
import ic_banner_card from '../../../../../assets/svg/ic_banner_card';
import { ButtonPrimary } from '../../../../core/presentation/components/button/ButtonPrimary';
import { useNewModalContext } from '../../../../core/presentation/contexts/messages/useNewModalContext';
import ic_alert_white_content from '../../../../../assets/svg/ic_alert_white_content';
import alert_ico_yellow_content from '../../../../../assets/svg/alert_ico_yellow_content';
import ic_alert_triangle_filled from '../../../../../assets/svg/ic_alert_triangle_filled';

interface Props {
}

export const ExpirationPaymentCard = ({
}: Props) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const showModal = useNewModalContext().showStateModal

  return (
    <View
      style={{ overflow: "hidden", flex: 1 }} >
      <CustomText
        marginTop={18}
        text='Mis próximos vencimientos'
        textSize={FontsSize._16_SIZE}
        fontFamily={Fonts.DMSansMedium} />
      <View
        style={{
          backgroundColor: colors.accentSecondary,
          borderRadius: 8,
          padding: 16,
          marginTop: 8,
          flex: 1
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}>
          <View>
            <CustomText
              text='Mayo 2024'
              textSize={FontsSize._16_SIZE}
              fontFamily={Fonts.DMSansMedium} />
            <CustomText
              textColor={colors.white}
              marginTop={4}
              text='Vencimiento: 30/05/2024'
              textSize={FontsSize._12_SIZE} />
          </View>
          <ButtonPrimary
            onPress={() => { }}
            position='relative'
            size="small"
            text='Pagar resumen' />
        </View>
        <View style={{ height: 1, backgroundColor: colors.white, marginTop: 12 }} />
        <View
          style={{
            marginEnd: 8,
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 19
          }}>
          <CustomText
            text='Total a pagar:'
            textSize={FontsSize._20_SIZE}
            fontFamily={Fonts.DMSansMedium} />
          <CustomText
            text='$180.00'
            textSize={FontsSize._16_SIZE}
            fontFamily={Fonts.DMSansMedium} />

        </View>
      </View>
    </View>
  )
};
