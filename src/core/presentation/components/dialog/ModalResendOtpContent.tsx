

import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';
import close_ico_black_content from '../../../../../assets/svg/xml/close_ico_black_content';
import { CustomText } from '../text/CustomText';
import security_ico_otp_content from '../../../../../assets/svg/xml/security_ico_otp_content';
import { Checkbox } from '../checkbox/Checkbox';
import check_ico_active_circle_green_content from '../../../../../assets/svg/xml/check_ico_active_circle_green_content';
import check_box_inactive_circle_content from '../../../../../assets/svg/xml/check_ico_inactive_circle_content';
import { ButtonPrimary } from '../button/ButtonPrimary';
import { useTranslation } from '../../contexts/translations/LanguageProvider';

interface Props {
  onClosePress: () => void;
  onSmsPress: () => void;
  onCallPress: () => void;

}

export const ModalResendOtpContent = ({ onClosePress, onSmsPress, onCallPress }: Props) => {


  const { translation } = useTranslation();

  const handleButtonPress = () => {

    if (isOptionSelected('SMS')) {
      onSmsPress();
    } else {
      onCallPress();
    }

    onClosePress();
  };

  const [selectedOption, setSelectedOption] = useState('');

  const handleCheckboxToggle = (option: string) => {
    setSelectedOption(option);
  };

  const isOptionSelected = (option: string) => {
    return selectedOption === option;
  };

  const isButtonEnabled = selectedOption !== '';


  return (
    <View style={style.contentBottomSheetContainer}>
      <TouchableOpacity style={{ position: 'absolute', right: 0, marginEnd: 26 }} onPress={onClosePress}>
        <SvgXml xml={close_ico_black_content} />
      </TouchableOpacity>
      <View style={{ marginTop: 30, alignSelf: 'center' }}>
        <SvgXml xml={security_ico_otp_content} />
      </View>
      <View style={{ alignSelf: 'center' }}>
        <CustomText
          text={translation.file.verify_phone_number}
          fontFamily={Fonts.encodesansBold}
          marginTop={24}
          textSize={FontsSize._18_SIZE}
        />
      </View>
      <View style={{ marginStart: 24, marginEnd: 24, marginBottom: 24 }}>
        <CustomText
          textAlign="center"
          text={translation.file.verify_phone_number_description}
          fontFamily={Fonts.PoppinsRegular}
          marginTop={8}
          textSize={FontsSize._14_SIZE}
        />
      </View>

      <View style={{ marginStart: 35, }}>
        <View style={{ flexDirection: 'row' }}>
          <Checkbox
            checkedImage={check_ico_active_circle_green_content}
            uncheckedImage={check_box_inactive_circle_content}
            label={translation.file.call_validation}
            labelEnd="SMS"
            checked={isOptionSelected('SMS')}
            onToggle={() => handleCheckboxToggle('SMS')}
          />
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Checkbox
            checkedImage={check_ico_active_circle_green_content}
            uncheckedImage={check_box_inactive_circle_content}
            label={translation.file.call_validation}
            labelEnd={translation.file.call ?? "Llamada"}
            checked={isOptionSelected('Llamada')}
            onToggle={() => handleCheckboxToggle('Llamada')}
          />
        </View>
      </View>

      <View style={{ marginTop: 42, marginBottom: 37 }}>
        <ButtonPrimary text={translation.file.common_accept} isEnabled={isButtonEnabled} onPress={handleButtonPress} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  contentBottomSheetContainer: {
    flex: 1,
    marginStart: 24,
    marginEnd: 24
  }
});
