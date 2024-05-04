import React, { useContext, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import Tooltip from 'react-native-walkthrough-tooltip';
import { SvgXml } from 'react-native-svg';
import ic_tooltip_gray from '../../../../../assets/svg/xml/ic_tooltip_gray';
import { CustomText } from '../text/CustomText';

interface Props {
  text: string;
  width?: any
}

export const CustomToolTip = ({
  text,
  width = "70%",
}: Props) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  if (text == undefined) text = '';
  const [showNameTip, setNameTip] = useState(false);

  return <Tooltip
    isVisible={showNameTip}
    placement='top'
    contentStyle={{ backgroundColor: "black", borderRadius: 8 }}
    onClose={() => setNameTip(false)}
    tooltipStyle={{ width: width }}
    content={
      <View style={{ paddingHorizontal: 8 }} >
        <CustomText
          textColor={colors.white}
          text={text} />
      </View>
    }
  >
    <TouchableOpacity onPress={() => { setNameTip(true) }} >
      <SvgXml xml={ic_tooltip_gray} style={{ marginStart: 4 }} />
    </TouchableOpacity>
  </Tooltip>
}

export default CustomToolTip;