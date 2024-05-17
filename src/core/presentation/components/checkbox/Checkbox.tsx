import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Fonts from '../../../constants/Fonts';
import ic_checkbox_inactive from '../../../../../assets/svg/ic_checkbox_inactive';
import ic_checkbox_active from '../../../../../assets/svg/ic_checkbox_active';
import { CustomTextBold } from '../text/CustomTextBold';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { useContext } from 'react';

interface Props {
  label?: string;
  checked: boolean;
  onToggle: (value: boolean) => void;
  uncheckedImage?: any;
  checkedImage?: any;
  marginTop?: number
  size?: number,
  marginEnd?: number;
  fontFamily?: string;
  textSize?: number;
  opacity?: number;
}

export const Checkbox = ({ label, checked, onToggle, uncheckedImage, checkedImage, size = 20
  , marginEnd = 8, fontFamily = Fonts.DMSansMedium, textSize = 14, marginTop, opacity }: Props) => {
  const handleToggle = () => {
    onToggle(!checked);
  };

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: marginTop
    },
    checkboxContainer: {
      width: 20,
      height: 20,
      marginEnd: marginEnd,
    },
    checkbox: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    checkedImage: {
      width: 30,
      height: 30,

    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={handleToggle} activeOpacity={0.7}>
      <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: "center" }}>
        <View >
          {checked ? (
            checkedImage ? (
              <SvgXml xml={checkedImage} style={styles.checkedImage} width={size} height={size} preserveAspectRatio="xMinYMin slice" />
            ) : (
              <SvgXml xml={ic_checkbox_active} width={size} height={size} preserveAspectRatio="xMinYMin slice" />
            )
          ) : uncheckedImage ? (
            <SvgXml xml={uncheckedImage} style={styles.checkedImage} width={size} height={size} preserveAspectRatio="xMinYMin slice" />
          ) : (
            <SvgXml xml={ic_checkbox_inactive} width={size} height={size} preserveAspectRatio="xMinYMin slice" />
          )}
        </View>
        <View style={{ width: 6 }}></View>
        {
          label ?
            (
              <CustomTextBold
                text={label}
                opacity={opacity}
                textColor={colors.secondaryText}
                fontFamily={fontFamily}
                textSize={textSize} />)
            : null
        }
      </View>
    </TouchableOpacity>
  );
};
