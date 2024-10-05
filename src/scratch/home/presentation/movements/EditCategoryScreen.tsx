import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { useTranslation } from '../../../../core/presentation/contexts/translations/LanguageProvider';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import ToolbarView from '../../../../core/presentation/components/toolbar/ToolbarView';
import FontsSize from '../../../../core/constants/FontsSize';
import Fonts from '../../../../core/constants/Fonts';
import { SvgXml } from 'react-native-svg';
import { categories, Categories, getCategory, getColor, getIcon, } from '../components/MovementsItem';
import { Checkbox } from '../../../../core/presentation/components/checkbox/Checkbox';
import ic_unchecked_circle from '../../../../../assets/svg/ic_unchecked_circle';
import ic_checked_circle from '../../../../../assets/svg/ic_checked_circle';
import { ButtonPrimary } from '../../../../core/presentation/components/button/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import { useNewModalContext } from '../../../../core/presentation/contexts/messages/useNewModalContext';
import ic_success_check_filled from '../../../../../assets/svg/ic_success_check_filled';
import HomeViewModel from '../HomeViewModel';
import container from '../../../di/inversify.config';
import { TYPES } from '../../../di/types';
import ic_exclamation_error_filled_48 from '../../../../../assets/svg/ic_exclamation_error_filled_48';

export const EditCategoryScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const { translation } = useTranslation();
  const navigation = useNavigation()
  const showStateModal = useNewModalContext().showStateModal

  const viewModel = container.get<HomeViewModel>(
    TYPES.HomeViewModel,
  );

  const [selectedOption, setSelectedOption] = useState<Categories>(categories[0]);


  const isOptionSelected = (option: Categories) => {
    return selectedOption.name === option.name;
  };


  useEffect(() => {
    if (viewModel.movement.category_id) setSelectedOption(categories.find(item => item.id === viewModel.movement.category_id))
  }, [])

  useEffect(() => {
    return reaction(
      () => viewModel.successResponse,
      () => {
        showStateModal({
          title: "Cambio guardado",
          message: "Se ha realizado el cambio la categoría con éxito.",
          image: ic_success_check_filled,
          showIcoClose: true,
          enableOverlayTap: "none",
          actionCloseModal() {
            navigation.goBack()
          },
          size: "30%",
        })
      }
    )
  }, [])

  useEffect(() => {
    return reaction(
      () => viewModel.errorResponse,
      () => {
        showStateModal({
          title: "Ha ocurrido un problema",
          message: "No se ha realizado el cambio la categoría, aguarda unos minutos he inténtalo nuevamente.",
          image: ic_exclamation_error_filled_48,
          showIcoClose: true,
          size: "30%"
        })
      }
    )
  }, [])


  return (
    <ToolbarView
      text='Categorías'>
      {categories.map((item, index) => {
        return (
          <TouchableOpacity
            activeOpacity={.8}
            onPress={() => setSelectedOption(item)}
            style={{ flexDirection: "row", marginTop: 24, paddingHorizontal: 16 }}>
            <View style={{ backgroundColor: getColor(item.id, colors), borderRadius: 8, padding: 8, }}>
              <SvgXml xml={getIcon(item.id)} />
            </View>
            <View style={{ marginStart: 8, alignSelf: "center" }}>

              <CustomText
                textSize={FontsSize._16_SIZE}
                text={getCategory(item.id)} />
            </View>
            <View style={{ flex: 1, alignContent: "flex-end", alignItems: "flex-end" }}>

              <Checkbox
                checkedImage={ic_checked_circle}
                uncheckedImage={ic_unchecked_circle}
                fontFamily={Fonts.PoppinsMedium}
                textSize={FontsSize._14_SIZE}
                size={24}
                checked={isOptionSelected(item)}
                onToggle={() => { }}
              />
            </View>
          </TouchableOpacity>
        )
      })}

      <ButtonPrimary
        text='Guardar'
        marginHorizontal={16}
        onPress={() => {
          viewModel.saveCategory(selectedOption.id)
        }} />

    </ToolbarView>
  );
});

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
  linearGradient: {
    top: 56,
    height: 184,
    width: "100%",
    position: "absolute",
    zIndex: -1
  }
});