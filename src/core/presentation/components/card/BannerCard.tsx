import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../text/CustomText';
import FontsSize from '../../../constants/FontsSize';
import { SvgXml } from 'react-native-svg';
import arrow_indicator_card_home from '../../../../../assets/svg/xml/arrow_indicator_card_home';
import Fonts from '../../../constants/Fonts';
import FastImage from 'react-native-fast-image';

interface Props {
  title: string;
  svg?: any;
  image?: any;
}

const BannerCard = ({ title, svg, image }: Props) => {
  const SvgElement = svg as React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  return (
    <View style={style.cardContainer}>
      <View style={{ marginStart: 16, alignSelf: 'center' }}>
        <CustomText
          text={title}
          textSize={FontsSize._16_SIZE}
          fontFamily={Fonts.PoppinsRegular}
          lineHeight={1.5 * FontsSize._16_SIZE}
        />
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', borderRadius: 14, overflow: 'hidden' }}>
        <View style={{ backgroundColor: 'white', borderRadius: 14 }}>
          {svg && <SvgElement style={{ borderRadius: 14 }} />}
          {image && <FastImage source={image} style={{ width: 193, height: 124, borderRadius: 14 }} />}
        </View>

        <View style={{ position: 'absolute', right: 26, bottom: 15 }}>
          <SvgXml xml={arrow_indicator_card_home}></SvgXml>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 5,
    shadowOpacity: 0.2,
    borderRadius: 14,
  },
});

export default BannerCard;