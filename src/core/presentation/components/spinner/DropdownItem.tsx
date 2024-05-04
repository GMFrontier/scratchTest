import React, { useState } from 'react';
import { View } from 'react-native';
import { CustomText } from '../text/CustomText';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';
import { SvgXml } from 'react-native-svg';
import FastImage from 'react-native-fast-image';

interface Props {
  label: string;
  ico?: any;
  uri?: string;
  type?: 'xml' | 'uri';
}

const DropdownItem = ({ label, ico = null, uri = null, type = "xml" }: Props) => {

  const [errorOccurred, setErrorOccurred] = useState(false);

  const handleImageError = () => {
    setErrorOccurred(true);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        borderRadius: 10,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 28,
      }}
    >
      {(ico && errorOccurred) && <SvgXml xml={ico} />}
      {(type === "xml" && ico) && <SvgXml xml={ico} />}
      {(type === "uri" && uri && !errorOccurred) && <FastImage style={{ width: 20, height: 20 }} source={{ uri: uri }} resizeMode={FastImage.resizeMode.contain} onError={handleImageError} />}
      {ico !== null && <View style={{ width: 20 }} />}
      <CustomText
        text={label}
        fontFamily={Fonts.PoppinsMedium}
        textSize={FontsSize._15_SIZE}
        textColor="#3D444F"
      />
    </View>
  );
};

export default DropdownItem;
