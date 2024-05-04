import { TouchableOpacity, View } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { SvgXml } from 'react-native-svg';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';
import plus_ico_content from '../../../../../assets/svg/xml/plus_ico_content';
import { useTranslation } from '../../contexts/translations/LanguageProvider';
import { CustomText } from '../text/CustomText';

interface Props {
  onPress: () => void;
}

export const ButtonAdd = ({
  onPress,
}: Props) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const { translation } = useTranslation();

  return (
    <View style={{ position: 'absolute', right: 0, flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={onPress}>
        <CustomText
          text={translation.file.add}
          fontFamily={Fonts.PoppinsMedium}
          textSize={FontsSize._14_SIZE}
          textColor={colors.green07}
          underline={true} />
      </TouchableOpacity>
      <SvgXml xml={plus_ico_content}></SvgXml>
    </View>
  );
};

