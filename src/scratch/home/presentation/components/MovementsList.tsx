import { useContext } from "react";
import { ThemeContext } from "../../../../core/presentation/contexts/theme/ThemeContext";
import { FlatList, View } from "react-native";
import { CustomText } from "../../../../core/presentation/components/text/CustomText";
import FontsSize from "../../../../core/constants/FontsSize";
import Fonts from "../../../../core/constants/Fonts";
import { ButtonLink } from "../../../../core/presentation/components/button/ButtonLink";
import ic_arrow_right from "../../../../../assets/svg/ic_arrow_right";
import { Movements, MovementsItem } from "./MovementsItem";
import { ROUTES } from "../../../navigation/routes";
import { useNavigation } from "@react-navigation/native";

interface Props {
  items: Movements[]
}

export const MovementsList = ({
  items
}: Props) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const navigation = useNavigation()

  return (
    <View
      style={{
        marginTop: 18,
      }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
        <CustomText
          text='Mis últimos movimientos'
          textSize={FontsSize._16_SIZE}
          fontFamily={Fonts.DMSansMedium} />
        <ButtonLink
          text='Ver todos'
          imageEnd={ic_arrow_right}
          onPress={() => {
            navigation.navigate(ROUTES.Home.MovementsScreen.name as never)
          }} />
      </View>
      <View
        style={{
          backgroundColor: colors.accentSecondary,
          height: 51,
          borderRadius: 8,
          padding: 16,
          marginTop: 6,
        }}
      >
        <CustomText
          text='Aún no tienes movimientos disponibles'
          textSize={FontsSize._16_SIZE}
          textColor={colors.white}
          textAlign="center" />
      </View>
      <FlatList
        data={items}
        renderItem={(item) => <MovementsItem item={item.item} />}
        scrollEnabled={false}
        keyExtractor={(item, index) => item.id}
        showsVerticalScrollIndicator={false} />
    </View>
  )
};
