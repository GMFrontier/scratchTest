import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import FontsSize from '../../../constants/FontsSize';
import Fonts from '../../../constants/Fonts';
import alert_ico_black_content from '../../../../../assets/svg/alert_ico_black_content';
import close_ico_black_toast_content from '../../../../../assets/svg/close_ico_black_toast_content';

interface Props {
  label: string;
  labelClick?: string;
  onPress?: () => void;
}

const CustomMessageToast = ({ label, labelClick, onPress }: Props) => {
  return (
    <View style={style.toastContent}>
      <View style={{ marginStart: 16 }}>
        <SvgXml xml={alert_ico_black_content} />
      </View>
      <View style={{ flex: 1, marginStart: 16 }}>
        <Text style={style.textStyle}>
          {label}
          <TouchableOpacity onPress={onPress}>
            <Text style={style.textClickStyle}>{labelClick}</Text>
          </TouchableOpacity>
        </Text>
      </View>
      <TouchableOpacity onPress={() => Toast.hide()}>
        <View style={{ marginEnd: 16 }}>
          <SvgXml xml={close_ico_black_toast_content} />
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

    backgroundColor: '#D7DAE0',
  },
  textStyle: {
    fontFamily: Fonts.PoppinsRegular,
    alignContent: 'center',
    fontSize: FontsSize._16_SIZE,
    alignItems: 'center',
    color: 'black',
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

export default CustomMessageToast;
