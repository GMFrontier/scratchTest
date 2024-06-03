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

export const BannerCard = ({
}: Props) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const showModal = useNewModalContext().showStateModal

  return (
    <View
      style={{
        backgroundColor: colors.accentSecondary,
        height: 119,
        borderRadius: 8,
        padding: 16,
        marginTop: 18,
        flexDirection: "row",
        justifyContent: "space-between"
      }}
    >
      <View
        style={{
          marginEnd: 8,
          alignSelf: "center"
        }}>
        <CustomText
          text={"Obtén tu primera tarjeta\nde crédito fácil y rápido."}
          fontFamily={Fonts.DMSansMedium}
          textColor={colors.white} />
        <View
          style={{
            marginTop: 8,
            marginStart: 8
          }}
        >

          <ButtonPrimary
            onPress={() => {
              showModal({
                title: "Perfil en revisión",
                size: "35%",
                message: "Podrás solicitar tu tarjeta una vez se te asigne tu primera línea de crédito, te informaremos tan pronto como esté disponible tu limite aprobado.",
                image: ic_alert_triangle_filled,
                showIcoClose: true,
                enableOverlayTap: "none"
              })
            }}
            position='relative'
            size="small"
            imageStart={ic_card_outline}
            text='Solicitar tarjeta' />
        </View>
      </View>
      <SvgXml xml={ic_banner_card} style={{}} />
    </View>
  )
};
