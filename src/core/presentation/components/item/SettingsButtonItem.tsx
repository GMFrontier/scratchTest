import { View } from 'react-native';
import { CustomText } from '../text/CustomText';
import { SvgXml } from 'react-native-svg';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { useContext } from 'react';
import FontsSize from '../../../constants/FontsSize';
import ic_right_arrow_outline_white from '../../../../../assets/svg/ic_right_arrow_outline_white';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  text: string,
  icon: string
  onPress: () => void
}

const SettingsButtonItem = ({ text, icon, onPress }: Props) => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={{ flexDirection: "row", height: 56, alignItems: "center", marginBottom: 16 }}
      activeOpacity={.8}
      onPress={onPress}
    >
      <View style={{
        backgroundColor: colors.blue300,
        borderRadius: 7,
        padding: 8,
        alignSelf: "center"
      }} >
        <SvgXml xml={icon} />
      </View>
      <View style={{ flex: 1, marginStart: 4 }} >
        <CustomText
          text={text}
          textSize={FontsSize._16_SIZE}
          textColor={colors.white}
        />
      </View>
      <SvgXml xml={ic_right_arrow_outline_white} />
    </TouchableOpacity>
  );
};



export default SettingsButtonItem;