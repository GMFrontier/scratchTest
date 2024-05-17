import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import React = require('react');
import { ThemeContext } from '../../../core/presentation/contexts/theme/ThemeContext';
import { useTranslation } from '../../../core/presentation/contexts/translations/LanguageProvider';
import { CustomText } from '../../../core/presentation/components/text/CustomText';
import Fonts from '../../../core/constants/Fonts';
import FontsSize from '../../../core/constants/FontsSize';
import { useNavigation } from '@react-navigation/native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import ToolbarView from '../../../core/presentation/components/toolbar/ToolbarView';
import { TextInputMain } from '../../../core/presentation/components/input/TextInputMain';
import { ButtonPrimary } from '../../../core/presentation/components/button/ButtonPrimary';
import { useStatusBar } from '../../../core/presentation/contexts/statusBar/StatusBarContext';
import { ROUTES } from '../../navigation/routes';

export const RecoverPinScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const PIN_LENGTH = 6
  const { translation } = useTranslation();
  const nav = useNavigation()
  const [email, setEmail] = useState('');

  React.useEffect(() => {
    changeNavigationBarColor(colors.accent);
  })

  return (
    <ToolbarView
      text='Restablecimiento de PIN'>
      <View style={style.containerMain}>
        <CustomText
          marginTop={20}
          text={"Ingresa tu correo electrónico"}
          textColor={colors.secondary}
          fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._32_SIZE} />

        <CustomText
          text={"Te enviaremos un código de verificación para reestablecer tu PIN"}
          marginTop={8}
          fontFamily={Fonts.DMSansRegular}
          textSize={FontsSize._16_SIZE} />

        <TextInputMain
          marginTop={48}
          onChangeText={setEmail}
          labelTitleRequired={true}
          labelTitle={translation.file.email}
          placeholder={translation.file.email_placeholder} />

        <ButtonPrimary
          text={translation.file.next}
          disabled={email.trim().length <= 0}
          onPress={() => {
            nav.navigate(ROUTES.Auth.RecoverPinEmailValidationScreen.name as never)
          }}
        />
      </View>
    </ToolbarView>
  );
});


const style = StyleSheet.create({
  containerMain: {
    flex: 1,
    paddingHorizontal: 16,
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});