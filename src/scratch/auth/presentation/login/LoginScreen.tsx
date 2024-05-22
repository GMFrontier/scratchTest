import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import React = require('react');
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { useTranslation } from '../../../../core/presentation/contexts/translations/LanguageProvider';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import Fonts from '../../../../core/constants/Fonts';
import FontsSize from '../../../../core/constants/FontsSize';
import { TextInputMain } from '../../../../core/presentation/components/input/TextInputMain';
import { Checkbox } from '../../../../core/presentation/components/checkbox/Checkbox';
import { ButtonPrimary } from '../../../../core/presentation/components/button/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../navigation/routes';
import { ButtonLink } from '../../../../core/presentation/components/button/ButtonLink';
import Sizebox from '../../../../core/presentation/components/item/Sizebox';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

export const LoginScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const [checkbox, setCheckbox] = useState(false);

  const { translation } = useTranslation();

  const navigation = useNavigation()

  React.useEffect(() => {
    changeNavigationBarColor(colors.accent);
  })

  return (
    <View style={style.containerMain}>

      <CustomText
        text={translation.file.login_welcome}
        textColor={colors.secondary}
        marginTop={202}
        textAlign='center'
        fontFamily={Fonts.DMSansBold}
        textSize={FontsSize._24_SIZE} />

      <TextInputMain
        marginTop={32}
        onChangeText={() => { }}
        labelTitleRequired={true}
        labelTitle={translation.file.email}
        placeholder={translation.file.email_placeholder} />

      <Checkbox
        opacity={.8}
        marginTop={27}
        checked={checkbox}
        label={translation.file.remember_email}
        onToggle={setCheckbox}
      />

      <ButtonPrimary
        text={translation.file.continue}
        marginBottom={130}
        onPress={() => { navigation.navigate(ROUTES.Auth.PinScreen.name as never) }} />

      <View style={{ bottom: 70, position: "absolute", alignSelf: "center", flexDirection: "row", }} >
        <CustomText
          text={translation.file.dont_have_account_yet}
        />
        <Sizebox width={4} />
        <ButtonLink
          text={translation.file.register_here}
          onPress={() => {
            navigation.navigate(ROUTES.Auth.RegisterScreen.name as never)
          }}
        />
      </View>

    </View>
  );
});

const style = StyleSheet.create({
  containerMain: {
    flex: 1,
    paddingHorizontal: 16,
  }, cardContainer: {
    marginStart: 16,
    marginEnd: 16,
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 10,
    shadowOpacity: 0.2,
    borderRadius: 14,
  },
});