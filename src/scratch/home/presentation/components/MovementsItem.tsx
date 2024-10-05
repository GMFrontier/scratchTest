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
import HomeViewModel from '../HomeViewModel';
import container from '../../../di/inversify.config';
import { TYPES } from '../../../di/types';


export interface Categories {
  name: "none" | "shopping" | "food" | "bills" | "services" | "market" | "transport" | "trips"
  image: string
  id: string
}


export const categories: Array<Categories> = [
  {
    name: "none",
    image: "category_0",
    id: "66f209274e9fb3982b9c5c1b"
  },
  {
    name: "shopping",
    image: "category_1",
    id: "66f2099645705115b99edc1c"
  },
  {
    name: "food",
    image: "category_2",
    id: "66f209c94e9fb3982b9c5c1c"
  },
  {
    name: "bills",
    image: "category_3",
    id: "66f209cf4e9fb3982b9c5c1d"
  },
  {
    name: "services",
    image: "category_4",
    id: "66f209d745705115b99edc1d"
  },
  {
    name: "market",
    image: "category_5",
    id: "66f209dd00420af231e977c0"
  },
  {
    name: "transport",
    image: "category_6",
    id: "66f209e300420af231e977c1"
  },
  {
    name: "trips",
    image: "category_7",
    id: "66f209ec00420af231e977c2"
  },
]

export interface DateGroup {
  monthYear: string
  dataList: Movement[]
}

export const getIcon = (
  id: string
): string => {
  const category = categories.find(item => item.id === id)
  switch (category?.image ?? "") {
    case "category_1":
      return ic_shopping
    case "category_2":
      return ic_food
    case "category_3":
      return ic_bills
    case "category_4":
      return ic_phone
    case "category_5":
      return ic_market
    case "category_6":
      return ic_transport
    case "category_7":
      return ic_trips
    default:
      return ic_movements_none
  }
}

export const getColor = (
  id: string,
  colors: any
): string => {
  const category = categories.find(item => item.id === id)
  switch (category?.name ?? "") {
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
  id: string,
): string => {
  const category = categories.find(item => item.id === id)
  switch (category?.name ?? "asdasdas") {
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

export const getStatus = (
  status: any,
): string => {
  switch (status) {
    case "rejected":
      return "Rechazado"
    case "approved":
      return "Aprobado"
    case "cancelled":
      return "Anulado"
    case "PENDING":
    case "PeticionAutorizacion":
      return "Pendiente"
    default:
      return ""
  }
}

interface Props {
  item: Movement
}

export const MovementsItem = ({ item
}: Props) => {

  const viewModel = container.get<HomeViewModel>(
    TYPES.HomeViewModel,
  );

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const navigation = useNavigation()

  const { detail, status, messageSys, type, amount, category_id } = item

  const getStatusColor = (): string => {
    switch (status) {
      case "rejected":
        return colors.red500
      case "approved":
        return colors.green400
      case "cancelled":
        return colors.orange300
      case "PENDING":
      case "PeticionAutorizacion":
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
        viewModel.setMovement(item)
        navigation.navigate(ROUTES.Home.DetailsScreen.name as never)
      }}
      style={{
        flexDirection: "row",
        height: 67,
        paddingVertical: 8,
        alignItems: "center"
      }} >
      <View style={{ backgroundColor: getColor(category_id, colors), borderRadius: 8, padding: 8, }}>
        <SvgXml xml={getIcon(category_id)} />
      </View>
      <Sizebox width={4} />
      <View>
        <CustomText
          textSize={FontsSize._16_SIZE}
          text={detail ?? messageSys} />
        <CustomText
          textSize={FontsSize._12_SIZE}
          textColor={getStatusColor()}
          marginTop={4}
          text={getStatus(status)} />
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
