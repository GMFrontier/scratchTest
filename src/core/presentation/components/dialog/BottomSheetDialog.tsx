import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { CustomText } from '../text/CustomText';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { ButtonPrimary } from '../button/ButtonPrimary';
import { ButtonSecondary } from '../button/ButtonSeconday';
import { BackdropPressBehavior } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import close_ico_black_content from '../../../../../assets/svg/close_ico_black_content';
import { CustomTextEndBold } from '../text/CustomTextBoldEnd';
import info_circle_blue_ico_content from '../../../../../assets/svg/info_circle_blue_ico_content';

interface Props {
  title: string;
  body?: string;
  bodyEndBold?: string;
  image?: any;
  bottomSheetRef: any;
  labelButton: string;
  labelSecondaryButton?: string;
  showSecondaryButton?: boolean;
  showCloseBtn?: boolean;
  extraInfoText?: string;
  onClosePress?: () => void;
  onButtonPress?: () => void;
  onSecondaryButtonPress?: () => void;
  closeBehavior?: BackdropPressBehavior;
}

export const BottomSheetDialog = ({
  title,
  body = '',
  bodyEndBold,
  labelButton,
  labelSecondaryButton = '',
  image,
  showSecondaryButton = false,
  showCloseBtn = false,
  bottomSheetRef,
  extraInfoText,
  onClosePress,
  onButtonPress = () => { },
  onSecondaryButtonPress = () => { },
  closeBehavior = 'none'
}: Props) => {
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        enableTouchThrough={true}
        pressBehavior={closeBehavior}
      />
    ),
    [],
  );

  const handleAnimateEnd = (toIndex: any) => {
    if (toIndex === -1 && onClosePress != undefined) {
      onClosePress();
    }
  };
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      index={-1}
      onChange={handleAnimateEnd}
      handleStyle={{ borderRadius: 24 }}
      backdropComponent={renderBackdrop}
      style={{ borderRadius: 32, overflow: 'hidden' }}
      animateOnMount={true}>
      <BottomSheetView>
        <View style={style.contentBottomSheetContainer}>

          <View style={{ marginTop: 30 }}>
            {image && <SvgXml xml={image}></SvgXml>}
          </View>

          {showCloseBtn &&
            <TouchableOpacity onPress={onClosePress} style={{ position: "absolute", alignSelf: "flex-end", end: 24 }} >
              <SvgXml xml={close_ico_black_content} />
            </TouchableOpacity>
          }
          <CustomText
            text={title}
            fontFamily={Fonts.PoppinsMedium}
            marginTop={24}
            textAlign='center'
            textSize={FontsSize._20_SIZE} />
          <View
            style={{
              marginStart: 24,
              marginEnd: 24,
              marginBottom: 24,
              marginTop: 16,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center"
            }}>
            <CustomTextEndBold
              fontFamilyEnd={Fonts.DMSansBold}
              fontFamily={Fonts.PoppinsRegular}
              textSize={FontsSize._16_SIZE}
              text={body}
              textAlign='center' />
            {
              extraInfoText &&
              <View style={{ flexDirection: "row", marginTop: 8 }} >
                <SvgXml height={24} width={24} xml={info_circle_blue_ico_content} style={{ marginEnd: 8 }} />
                <CustomText
                  text={extraInfoText}
                  textSize={FontsSize._14_SIZE} />
              </View>
            }
          </View>

          <View style={{ width: '85%', marginBottom: 40, marginTop: 16 }}>
            <ButtonPrimary
              text={labelButton}
              onPress={() => onButtonPress()}></ButtonPrimary>
            {showSecondaryButton &&
              <View style={{ marginTop: 8 }}>
                <ButtonSecondary
                  text={labelSecondaryButton}
                  onPress={() => onSecondaryButtonPress()} />
              </View>
            }
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
const style = StyleSheet.create({
  contentBottomSheetContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
});
