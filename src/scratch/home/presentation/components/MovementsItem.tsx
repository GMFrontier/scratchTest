import { useContext } from 'react';
import { View } from 'react-native';
import Sizebox from '../../../../core/presentation/components/item/Sizebox';
import FontsSize from '../../../../core/constants/FontsSize';
import { SvgXml } from 'react-native-svg';
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import Fonts from '../../../../core/constants/Fonts';
import ic_movements_none from '../../../../../assets/svg/ic_movements_none';
import { toMoneyFormat } from '../../../../core/data/utils/Utils';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ROUTES } from '../../../navigation/routes';
import ic_phone from '../../../../../assets/svg/ic_phone';
import ic_shopping from '../../../../../assets/svg/ic_shopping';
import ic_market from '../../../../../assets/svg/ic_market';
import ic_bills from '../../../../../assets/svg/ic_bills';
import ic_trips from '../../../../../assets/svg/ic_trips';
import ic_transport from '../../../../../assets/svg/ic_transport';
import ic_food from '../../../../../assets/svg/ic_food';

export interface Movements {
  id: string,
  title: string,
  status: "approved" | "rejected" | "pending" | "cancelled",
  amount: number,
  type: "none" | "shopping" | "food" | "bills" | "services" | "market" | "transport" | "trips",
  date?: string
}

export interface DateGroup {
  monthYear: string
  dataList: Movements[]
}

export const getIcon = (
  type: "shopping" | "food" | "bills" | "services" | "market" | "transport" | "trips" | "none"
): string => {
  switch (type) {
    case "shopping":
      return ic_shopping
    case "food":
      return ic_food
    case "bills":
      return ic_bills
    case "services":
      return ic_phone
    case "market":
      return ic_market
    case "transport":
      return ic_transport
    case "trips":
      return ic_trips
    default:
      return ic_movements_none
  }
}

export const getColor = (
  type: "shopping" | "food" | "bills" | "services" | "market" | "transport" | "trips" | "none",
  colors: any
): string => {
  switch (type) {
    case "shopping":
      return colors.cyan400
    case "food":
      return colors.pink400
    case "bills":
      return colors.teal600
    case "services":
      return colors.blue300
    case "market":
      return colors.orange300
    case "transport":
      return colors.lightBlue300
    case "trips":
      return colors.purple300
    default:
      return colors.blueGray300
  }
}

export const getCategory = (
  type: "shopping" | "food" | "bills" | "services" | "market" | "transport" | "trips" | "none",
): string => {
  switch (type) {
    case "shopping":
      return "Compras"
    case "food":
      return "Restaurantes y bares"
    case "bills":
      return "Facturas"
    case "services":
      return "Servicios (Cable, telefonía, internet)"
    case "market":
      return "Supermercado"
    case "transport":
      return "Transporte"
    case "trips":
      return "Viajes"
    default:
      return "Sin categoría"
  }
}

interface Props {
  item: Movements
}

export const MovementsItem = ({ item
}: Props) => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const navigation = useNavigation()

  const { title, status, type, amount } = item

  const getStatus = (): string => {
    switch (status) {
      case "rejected":
        return "Rechazado"
      case "approved":
        return "Aprobado"
      case "cancelled":
        return "Anulado"
      case "pending":
        return "Pendiente"
    }
  }
  const getStatusColor = (): string => {
    switch (status) {
      case "rejected":
        return colors.red500
      case "approved":
        return colors.green400
      case "cancelled":
        return colors.orange300
      case "pending":
        return colors.yellow500
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
    <TouchableOpacity
      activeOpacity={.8}
      onPress={() => {
        navigation.navigate(ROUTES.Home.DetailsScreen.name as never)
      }}
      style={{
        flexDirection: "row",
        height: 67,
        paddingVertical: 8,
        alignItems: "center"
      }} >
      <View style={{ backgroundColor: getColor(type, colors), borderRadius: 8, padding: 8, }}>
        <SvgXml xml={getIcon(type)} />
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
    </TouchableOpacity>
  );
};
