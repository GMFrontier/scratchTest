import { useContext, useState } from 'react';
import { View, StyleSheet, Platform, Text, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import React = require('react');
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { useTranslation } from '../../../../core/presentation/contexts/translations/LanguageProvider';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import Fonts from '../../../../core/constants/Fonts';
import FontsSize from '../../../../core/constants/FontsSize';
import { CommonActions, useNavigation } from '@react-navigation/native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import ToolbarView from '../../../../core/presentation/components/toolbar/ToolbarView';
import { PinView } from '../../../../core/presentation/components/input/PinView';
import { ROUTES } from '../../../navigation/routes';
import { useNewModalContext } from '../../../../core/presentation/contexts/messages/useNewModalContext';
import ic_success_check_filled from '../../../../../assets/svg/ic_success_check_filled';

export const RecoverPasswordCreateScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const PIN_LENGTH = 6
  const { translation } = useTranslation();
  const nav = useNavigation()

  const [value, setValue] = useState('');
  React.useEffect(() => {
    changeNavigationBarColor(colors.accent);
  })

  const showModal = useNewModalContext().showStateModal

  const goToHome = () => {
    nav.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: ROUTES.Navigator.BottomTabNavigator.name },
        ],
      })
    );
  }
  React.useEffect(() => {
    if (value.length === PIN_LENGTH) {
      showModal({
        title: "PIN reestablecido",
        message: "El PIN ha sido reestablecido con éxito, ya\npuedes acceder a tu cuenta.",
        image: ic_success_check_filled,
        labelButtonPrimary: "Acceder a mi cuenta",
        actionButtonPrimary() { goToHome() },
        actionCloseModal() { goToHome() },
        showIcoClose: true,
        enableOverlayTap: "none"
      })
    }
  }, [value])

  const styles = StyleSheet.create({
    containerMain: {
      flex: 1,
      paddingHorizontal: 16,
    },
  });

  return (
    <ToolbarView
      text='Restablecimiento de PIN'>
      <View style={styles.containerMain}>
        <CustomText
          marginTop={20}
          text={"Crea tu nuevo PIN"}
          textColor={colors.secondary}
          fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._32_SIZE} />

        <CustomText
          text={"Este debe ser distinto al anterior y debe\ncontener 6 dígitos."}
          marginTop={8}
          marginBottom={72}
          fontFamily={Fonts.DMSansRegular}
          textSize={FontsSize._16_SIZE} />

        <PinView
          setValue={setValue}
          showPinInputs={true}
          marginTop={72}
          showInfoText={true}
          errorText={"El PIN ingresado no puede ser igual al anterior"}
        />
      </View>
    </ToolbarView>
  );
});