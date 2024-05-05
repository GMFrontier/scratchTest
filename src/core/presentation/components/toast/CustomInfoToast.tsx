import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Fonts from '../../../constants/Fonts';
import { SvgXml } from 'react-native-svg';
import { CustomText } from '../text/CustomText';
import FontsSize from '../../../constants/FontsSize';
import Toast from 'react-native-toast-message';
import alert_ico_white_content from '../../../../../assets/svg/alert_ico_white_content';
import close_ico_white_content from '../../../../../assets/svg/close_ico_white_content';

interface Props {
  label: string;

}

const CustomInfoToast = ({ label }: Props) => {
  return (
    <View style={style.toastContent}>
      <View style={{ marginStart: 16 }}>
        <SvgXml xml={alert_ico_white_content} />
      </View>
      <View style={{ flex: 1, marginStart: 16 }}>
        <CustomText
          text={label}
          textColor="white"
          fontFamily={Fonts.DMSansRegular}
          textSize={FontsSize._12_SIZE}
        />
      </View>
      <TouchableOpacity onPress={() => Toast.hide()}>
        <View style={{ marginEnd: 16 }}>
          <SvgXml xml={close_ico_white_content} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  toastContent: {
    paddingTop: 15,
    paddingBottom: 15,
    width: '90%',
    flexDirection: 'row',
    borderRadius: 12,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#9A9A9A',
  },
});

export default CustomInfoToast;
