import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { TextInputMain } from './TextInputMain';
import { isValidPhoneCheck } from '../../../../paguelo_facil/presentation/utils/Utils';
import check_ico_content from '../../../../../assets/svg/xml/check_ico_content';
import { ButtonFlag } from '../button/ButtonFlag';
import NavigationService from '../../../../paguelo_facil/presentation/navigator/NavigatorService';
import { ROUTES } from '../../../../scratch/presentation/navigation/routes';
import { TouchableOpacity } from 'react-native';
import { useToastContext } from '../../contexts/messages/useToastContext';
import { useTranslation } from '../../contexts/translations/LanguageProvider';

interface Props {
  phone?: any;
  setPhone?: any;
  selectedOption?: any;
  setSelectedOption?: any;
  isEnabled?: boolean;
}

export const FlagInput = ({
  phone, setPhone, selectedOption, setSelectedOption, isEnabled = true
}: Props) => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const [isValidPhone, setIsValidPhone] = useState(false);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsValidPhone(isValidPhoneCheck(phone, option))
  };
  const { translation } = useTranslation();

  const showInfoToast = useToastContext().showInfoToast

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      opacity: isEnabled ? 1 : 0.35,
      backgroundColor: '#E9EBEE',
      borderRadius: 12,
      width: '100%',
      height: 56,
      color: '#3D444F',
      position: 'absolute',
      zIndex: isEnabled ? undefined : 1
    },
  });

  return (
    <View>
      <TouchableOpacity
        style={{ ...styles.container, }}
        activeOpacity={1}
        disabled={isEnabled}
        onPress={() => {
          showInfoToast(translation.file.edit_phone_unavailable ?? "No puedes editar tu número de teléfono porque ya ha sido validado, por favor contacta con soporte si necesitas realizar este cambio")
        }} />
      <View style={{
        flexDirection: "row", alignItems: 'center', marginHorizontal: 6
      }} >
        <ButtonFlag
          codePhone={selectedOption.split('*')[1]}
          flagCountry={selectedOption.split('*')[0]}
          disabled={!isEnabled}
          onPress={() => {
            NavigationService.navigate(
              ROUTES.Register.PhoneDialScreen.name,
              {
                onSelectOption: handleSelectOption,
              },
            );
          }} />
        <View style={{ flex: 1 }} >
          <TextInputMain
            inputValue={phone}
            onChangeText={(value: any) => {
              setPhone(value);
              setIsValidPhone(isValidPhoneCheck(value, selectedOption));
            }}
            typeKeyboard="numeric"
            maxLength={20}
            placeholder='00000000'
            rightIcon={check_ico_content}
            showIconEnd={isValidPhone}
            editable={isEnabled}
          />
        </View>
      </View>
    </View>
  );
};