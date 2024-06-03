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
import ic_movements_none from '../../../../../assets/svg/ic_movements_none';
import { toMoneyFormat } from '../../../../core/data/utils/Utils';

export interface Movements {
  id: string,
  title: string,
  status: "approved" | "rejected",
  amount: number,
  type: "none" | "shopping" | "food" | "bills" | "services" | "market" | "transport" | "trips"
}

interface Props {
  item: Movements
}

export const MovementsItem = ({ item
}: Props) => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const { title, status, type, amount } = item
  const getIcon = (): string => {
    switch (type) {
      case "shopping":
        return ic_movements_none
      case "food":
        return ic_movements_none
      case "bills":
        return ic_movements_none
      case "services":
        return ic_movements_none
      case "market":
        return ic_movements_none
      case "transport":
        return ic_movements_none
      case "trips":
        return ic_movements_none
      default:
        return ic_movements_none
    }
  }
  const getColor = (): string => {
    switch (type) {
      case "shopping":
        return "#33DFD6"
      case "food":
        return colors.blue400
      case "bills":
        return colors.blue400
      case "services":
        return colors.blue400
      case "market":
        return colors.blue400
      case "transport":
        return colors.blue400
      case "trips":
        return colors.blue400
      default:
        return colors.blue400
    }
  }
  const getStatus = (): string => {
    switch (status) {
      case "rejected":
        return "Rechazado"
      case "approved":
        return "Aprobado"
    }
  }
  const getStatusColor = (): string => {
    switch (status) {
      case "rejected":
        return colors.red500
      case "approved":
        return colors.green400
    }
  }
  const getAmountColor = (): string => {
    switch (status) {
      case "rejected":
        return colors.captionText
      case "approved":
        return undefined
    }
  }


  return (
    <View
      style={{
        flexDirection: "row",
        height: 67,
        paddingVertical: 8,
        alignItems: "center"
      }} >
      <View style={{ backgroundColor: getColor(), borderRadius: 8, padding: 8, }}>
        <SvgXml xml={getIcon()} />
      </View>
      <Sizebox width={4} />
      <View>
        <CustomText
          textSize={FontsSize._16_SIZE}
          text={title} />
        <CustomText
          textSize={FontsSize._12_SIZE}
          textColor={getStatusColor()}
          marginTop={4}
          text={getStatus()} />
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }} >
        <CustomText
          textSize={FontsSize._16_SIZE}
          textColor={getAmountColor()}
          fontFamily={Fonts.DMSansMedium}
          text={toMoneyFormat(amount)} />
      </View>
      <View style={{ backgroundColor: colors.white, height: 1, borderRadius: 1, width: "100%", position: "absolute", bottom: 0 }} />
    </View>
  );
};
