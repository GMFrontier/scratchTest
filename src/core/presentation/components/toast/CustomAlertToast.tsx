import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import alert_ico_black_content from '../../../../../assets/svg/xml/alert_ico_black_content';
import close_ico_black_toast_content from '../../../../../assets/svg/xml/close_ico_black_toast_content';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import FontsSize from '../../../constants/FontsSize';
import Fonts from '../../../constants/Fonts';
import { CustomText } from '../text/CustomText';

interface Props {
  label: string;
  onPress?: () => void;
}

const CustomAlertToast = ({ label, onPress }: Props) => {
  return (
    <View style={style.toastContent}>
      <TouchableOpacity onPress={onPress} style={{ flexDirection: "row" }}>
        <SvgXml xml={alert_ico_black_content} style={{ marginStart: 16 }} />
        <View style={{ flex: 1, marginStart: 16, marginEnd: 16 }}>
          <CustomText
            text={label}
            textSize={FontsSize._12_SIZE} />
        </View>
        <TouchableOpacity onPress={() => Toast.hide()}>
          <SvgXml xml={close_ico_black_toast_content} style={{ marginEnd: 16 }} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  toastContent: {
    paddingTop: 15,
    paddingBottom: 15,
    width: '90%',
    flex: 1,
    flexDirection: 'row',
    borderRadius: 12,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#FFC400',
  },
  textClickStyle: {
    fontWeight: '500',
    marginStart: 2,
    fontSize: FontsSize._12_SIZE,
    top: 4,
    fontFamily: Fonts.PoppinsMedium,
    color: 'black',
  },
});

export default CustomAlertToast;
