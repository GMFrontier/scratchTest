import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { TextInputMain } from './TextInputMain';
import { TouchableOpacity } from 'react-native';
import { useToastContext } from '../../contexts/messages/useToastContext';
import { useTranslation } from '../../contexts/translations/LanguageProvider';
import { isValidPhoneCheck } from '../../../data/utils/Utils';
import { ButtonFlag } from '../button/ButtonFlag';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../../scratch/navigation/routes';

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

  const nav = useNavigation()

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderRadius: 12,
      width: '100%',
      height: 56,
      position: 'absolute',
      zIndex: isEnabled ? undefined : 1
    },
  });

  return (
    <View>
      <View style={{
        flexDirection: "row", alignItems: 'center',
      }} >

        <ButtonFlag
          codePhone={selectedOption.split('*')[1]}
          flagCountry={selectedOption.split('*')[0]}
          disabled={!isEnabled}
          onPress={() => {
            // nav.navigate(
            //   ROUTES.Register.PhoneDialScreen.name,
            //   {
            //     onSelectOption: handleSelectOption,
            //   },
            // );
          }} />
        <View style={{ flex: 1, marginStart: 4 }} >
          <TextInputMain
            inputValue={phone}
            onChangeText={(value: any) => {
              setPhone(value);
              //setIsValidPhone(isValidPhoneCheck(value, selectedOption));
            }}
            editable={isEnabled}
            typeKeyboard="numeric"
            maxLength={20}
            placeholder='00000000'
          // rightIcon={check_ico_content}
          //showIconEnd={isValidPhone}
          />
        </View>
      </View>
    </View>
  );
};