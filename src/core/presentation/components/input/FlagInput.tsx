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
import ic_alert_triangle_filled from '../../../../../assets/svg/ic_alert_triangle_filled';
import check_ico_content from '../../../../../assets/svg/check_ico_content';
import ic_success_check_filled from '../../../../../assets/svg/ic_success_check_filled';

interface Props {
  phone?: any;
  setPhone?: any;
  selectedOption?: any;
  setSelectedOption?: any;
  isEnabled?: boolean;
  marginTop?: number;
}

export const FlagInput = ({
  phone, setPhone, selectedOption, setSelectedOption, isEnabled = true, marginTop
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

  return (
    <View>
      <View style={{
        flexDirection: "row", alignItems: 'center', marginTop: marginTop
      }} >

        <ButtonFlag
          codePhone={selectedOption.split('*')[1]}
          flagCountry={selectedOption.split('*')[0]}
          disabled={!isEnabled}
          onPress={() => {
            nav.navigate(
              ROUTES.Auth.SelectPhoneFlagScreen.name,
              {
                onSelectOption: handleSelectOption,
              },
            );
          }} />
        <View style={{ flex: 1, marginStart: 4 }} >
          <TextInputMain
            inputValue={phone}
            onChangeText={(value: any) => {
              setPhone(value);
              //setIsValidPhone(isValidPhoneCheck(value, selectedOption));
            }}
            editable={isEnabled}
            inputType='number'
            maxLength={20}
            placeholder='00000000'
            backendError=''
            rightIcon={isValidPhoneCheck(phone, selectedOption) ? ic_success_check_filled : undefined}
          // rightIcon={check_ico_content}
          //showIconEnd={isValidPhone}
          />
        </View>
      </View>
    </View>
  );
};