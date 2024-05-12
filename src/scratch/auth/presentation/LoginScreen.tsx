import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import React = require('react');
import { ThemeContext } from '../../../core/presentation/contexts/theme/ThemeContext';
import { useTranslation } from '../../../core/presentation/contexts/translations/LanguageProvider';
import { CustomText } from '../../../core/presentation/components/text/CustomText';
import Fonts from '../../../core/constants/Fonts';
import FontsSize from '../../../core/constants/FontsSize';
import { TextInputMain } from '../../../core/presentation/components/input/TextInputMain';
import { Checkbox } from '../../../core/presentation/components/checkbox/Checkbox';
import { ButtonPrimary } from '../../../core/presentation/components/button/ButtonPrimary';

export const LoginScreen = observer(({ navigation }: any) => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const [checkbox, setCheckbox] = useState(false);

  const { translation } = useTranslation();

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
        onPress={() => { }} />

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