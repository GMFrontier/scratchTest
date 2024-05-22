import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { CustomText } from '../text/CustomText';
import Fonts from '../../../constants/Fonts';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import FontsSize from '../../../constants/FontsSize';
import FastImage from 'react-native-fast-image';
import Sizebox from '../item/Sizebox';

interface Props {
  item: any,
  fromBanksForm?: boolean,
  ico?: any
}

const AutoCompleteViewItem = ({ item, fromBanksForm, ico }: Props) => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const [errorOccurred, setErrorOccurred] = useState(false);

  const handleImageError = () => {
    setErrorOccurred(true);
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

      {fromBanksForm && !errorOccurred ? <FastImage style={{ width: 20, height: 20 }} source={{ uri: item.urlImage }} resizeMode={FastImage.resizeMode.contain} onError={handleImageError}></FastImage> : null}

      {ico && errorOccurred && fromBanksForm ? <SvgXml height={20} width={20} xml={ico}></SvgXml> : null}

      <Sizebox width={5}></Sizebox>
      <CustomText
        marginTop={10}
        marginBottom={10}
        fontFamily={Fonts.DMSansMedium}
        text={item.title ?? ''}
        textColor={colors.white}
        textSize={FontsSize._16_SIZE}>
      </CustomText>
    </View>
  );
};



export default AutoCompleteViewItem;