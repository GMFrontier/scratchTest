import { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
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
import ic_movements_none from '../../../../../assets/svg/ic_movements_none';
import { toMoneyFormat } from '../../../../core/data/utils/Utils';
import ic_arrow_right_white from '../../../../../assets/svg/ic_arrow_right_white';

export interface Movements {
  id: string,
  title: string,
  status: "approved" | "rejected",
  amount: number,
  type: "none" | "shopping" | "food" | "bills" | "services" | "market" | "transport" | "trips"
}

interface Props {
  text: string,
  onPress: () => void,
  icon?: string
}

export const FAQItem = ({
  text,
  onPress,
  icon
}: Props) => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 8 }} >
      <CustomText
        text={text}
        textSize={FontsSize._16_SIZE}
        textColor={colors.white}
        textAlign="center" />
      <SvgXml xml={icon ?? ic_arrow_right_white} />
    </TouchableOpacity>
  );
};
