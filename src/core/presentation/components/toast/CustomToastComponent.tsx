import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import FontsSize from '../../../constants/FontsSize';
import Fonts from '../../../constants/Fonts';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { ToastStyleType } from '../../contexts/messages/ToastContext';
import alert_ico_blue_content from '../../../../../assets/svg/alert_ico_blue_content';
import check_ico_content from '../../../../../assets/svg/check_ico_content';
import warning_ico_yellow_content from '../../../../../assets/svg/warning_ico_yellow_content';
import close_ico_toast_red_content from '../../../../../assets/svg/close_ico_toast_red_content';
import close_ico_gray_toast_content from '../../../../../assets/svg/close_ico_gray_toast_content';
interface Props {
  label: string;
  labelClick?: string;
  onPress?: () => void;
  params?: any
}

const CustomToastComponent = ({ label, labelClick, onPress, params }: Props) => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);


  var colorHeaderBar = colors.darkGray02;
  var icoToast = undefined;

  if (params == ToastStyleType.INFORMATIOM) {
    colorHeaderBar = colors.secondaryBlue07;
    icoToast = alert_ico_blue_content;
  }
  if (params == ToastStyleType.SUCCESS) {
    colorHeaderBar = colors.primary;
    icoToast = check_ico_content;
  }
  if (params == ToastStyleType.WARNING) {
    colorHeaderBar = colors.yellow03;
    icoToast = warning_ico_yellow_content;
  }

  if (params == ToastStyleType.ERROR) {
    colorHeaderBar = colors.alertColor;
    icoToast = close_ico_toast_red_content;
  }

  return (
    <View style={{ ...style.toastContent, backgroundColor: colorHeaderBar }}>
      <View style={{ marginTop: 0, backgroundColor: 'black', flexDirection: 'row', width: '100%', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: 16 }}>

        {icoToast ? <View style={{}}>
          <SvgXml xml={icoToast} />
        </View> : null}
        <View style={{ flex: 1, marginStart: 8 }}>
          <Text style={style.textStyle}>
            {label}
            <TouchableOpacity onPress={onPress}>
              <Text style={style.textClickStyle}>{labelClick}</Text>
            </TouchableOpacity>
          </Text>
        </View>
        <TouchableOpacity onPress={() => Toast.hide()}>
          <View style={{ marginEnd: 16 }}>
            <SvgXml xml={close_ico_gray_toast_content} />
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const style = StyleSheet.create({
  toastContent: {
    paddingTop: 10,
    width: '90%',
    flexDirection: 'row',
    borderRadius: 12,

  },
  textStyle: {
    fontFamily: Fonts.PoppinsRegular,
    alignContent: 'center',
    fontSize: FontsSize._16_SIZE,
    alignItems: 'center',
    color: 'white',
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

export default CustomToastComponent;
