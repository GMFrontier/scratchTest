import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { useStatusBar } from '../../../../core/presentation/contexts/statusBar/StatusBarContext';
import { useNewModalContext } from '../../../../core/presentation/contexts/messages/useNewModalContext';
import { useTranslation } from '../../../../core/presentation/contexts/translations/LanguageProvider';
import ToolbarView from '../../../../core/presentation/components/toolbar/ToolbarView';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import FontsSize from '../../../../core/constants/FontsSize';
import Fonts from '../../../../core/constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../navigation/routes';
import { ButtonPrimary } from '../../../../core/presentation/components/button/ButtonPrimary';
import { TextInputMain } from '../../../../core/presentation/components/input/TextInputMain';
import SelectCustomDropdown from '../../../../core/presentation/components/spinner/SelectCustomDropdown';
import { ic_id, ic_location, ic_location_large, ic_phone, ic_switch_active, ic_switch_inactive } from '../../../../../assets/svg/card_delivery';
import { SvgXml } from 'react-native-svg';
import { ButtonLink } from '../../../../core/presentation/components/button/ButtonLink';
import ic_success_check_filled from '../../../../../assets/svg/ic_success_check_filled';
import { FlagInput } from '../../../../core/presentation/components/input/FlagInput';
import { Switch } from 'react-native-switch';
import { img_card_activation } from '../../../../../assets/svg/card_activation';
import CardsViewModel from '../CardsViewModel';
import { TYPES } from '../../../di/types';
import container from '../../../di/inversify.config';
import ic_exclamation_error_filled_48 from '../../../../../assets/svg/ic_exclamation_error_filled_48';

export const ActivationScreen = observer(() => {
  const viewModel = container.get<CardsViewModel>(TYPES.CardsViewModel);

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const statusBar = useStatusBar()

  const modal = useNewModalContext().showStateModal
  const nav = useNavigation()

  const [CVV, setCVV] = useState('');
  const [pan, setPan] = useState('');

  const screenWidth = Dimensions.get("window").width

  useEffect(() => {
    statusBar.setPrimaryStatusBar()
    return () => {
      statusBar.setHomeStatusBar()
    }
  })


  useEffect(() => {
    return reaction(
      () => viewModel.errorResponse,
      () => {
        modal({
          title: "Ha ocurrido un problema",
          message: "No hemos podido activar tu tarjeta, aguarda unos minutos he inténtalo nuevamente.",
          image: ic_exclamation_error_filled_48,
          showIcoClose: true,
          size: "30%"
        })
      }
    )
  }, [])

  return (
    <ToolbarView
      text='Activar tarjeta'
    >
      <View style={style.containerMain}>
        <CustomText
          text={"Ingresa los datos de la tarjeta"}
          textColor={colors.secondary}
          fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._32_SIZE} />
        <CustomText
          text='Completa el CVV y sus últimos 4 dígitos.'
          textSize={FontsSize._16_SIZE}
          textColor={colors.white}
          marginTop={8} />

        <SvgXml
          xml={img_card_activation}
          width={screenWidth - 32}
          height={224 * (screenWidth - 32) / 343} // Maintain the aspect ratio
          style={{ alignSelf: "center", marginTop: 16 }} />

        <TextInputMain
          marginTop={18}
          onChangeText={setCVV}
          labelTitleRequired={true}
          labelTitle={"CVV"}
          inputType="alphanumeric"
          maxLength={4}
          // errorInfo={"Por favor ingresa tus datos sin caracteres especiales, sólo letras."}
          inputValue={CVV}
          placeholder={"Ingresar CVV"} />

        <TextInputMain
          marginTop={18}
          onChangeText={setPan}
          labelTitleRequired={true}
          labelTitle={"Últimos 4 dígitos"}
          inputType="alphanumeric"
          maxLength={4}
          // errorInfo={"Por favor ingresa tus datos sin caracteres especiales, sólo letras."}
          inputValue={pan}
          placeholder={"0000"} />

        <CustomText
          marginTop={5}
          textSize={FontsSize._12_SIZE}
          textColor={colors.white}
          text='Encuéntralos en el frente de la tarjeta' />

        <ButtonPrimary
          text={"Siguiente"}
          disabled={((pan.toString()).length <= 0) && ((CVV.toString()).length <= 0)}
          onPress={() => {
            viewModel.activateCard(pan, CVV)
          }} />
      </View>
    </ToolbarView>
  );
});

const style = StyleSheet.create({
  containerMain: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  }
});