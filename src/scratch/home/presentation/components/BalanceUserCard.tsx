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
import ProgressIndicator from '../../../../core/presentation/components/progress/ProgressIndicator';
import BalanceProgress from './BalanceProgress';
import ic_clock from '../../../../../assets/svg/ic_clock';

interface Props {
}

export const BalanceUserCard = ({
}: Props) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  return (
    <View
      style={{
        // backgroundColor: colors.blue400,
        borderRadius: 16,
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginHorizontal: 16
      }}
    >
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }} >
          <AvatarImage size={32} svg={ic_avatar_empty_profile} />
          <Sizebox width={8} />
          <CustomText
            textSize={FontsSize._16_SIZE}
            textColor={colors.white}
            text='Hola Gabriela' />
        </View>
        <CustomText
          marginTop={24}
          textSize={FontsSize._16_SIZE}
          textColor={colors.white}
          textAlign='center'
          fontFamily={Fonts.DMSansMedium}
          text='Limite disponible' />
        <CustomText
          marginTop={4}
          textSize={FontsSize._12_SIZE}
          textColor={colors.white}
          textAlign='center'
          fontFamily={Fonts.DMSansMedium}
          text='Fecha de cierre: 28/04/2024' />
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8, alignSelf: "center" }} >
          <CustomText
            textSize={FontsSize._24_SIZE}
            textColor={colors.white}
            fontFamily={Fonts.DMSansMedium}
            text='$' />
          <Sizebox width={4} />
          <CustomText
            fontFamily={Fonts.DMSansBold}
            textSize={FontsSize._48_SIZE}
            textColor={colors.white}
            text='200.00' />
        </View>
        <Sizebox height={20} />
        <BalanceProgress total={200} spent={155} />
        <Sizebox height={20} />

        <View style={{ flexDirection: "row", paddingEnd: 16 }} >
          <SvgXml height={16} width={16} xml={ic_clock} style={{ marginEnd: 8 }} />
          <CustomText
            textColor={colors.white}
            text={"Estamos en terminando de revisar tu perfil para aprobar el total de tu primera línea de crédito"}
            textSize={FontsSize._12_SIZE} />
        </View>
      </View>
      {/* <SvgXml
        xml={
          true
            ? ic_eye_open_outline
            : ic_eye_open_outline
        }
      /> */}
    </View>
  )
};
