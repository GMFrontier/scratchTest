import React, { useMemo, useCallback, useContext, } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';
import close_ico_black_content from '../../../../../assets/svg/xml/close_ico_black_content';
import { CustomText } from '../text/CustomText';
import BottomSheet, {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { useTranslation } from '../../contexts/translations/LanguageProvider';
import card_reverse_crypto from '../../../../../assets/svg/xml/card_reverse_crypto';
import { ThemeContext } from '../../contexts/theme/ThemeContext';

interface Props {
  bottomSheetRef: any;
  onClosePress: () => void;
}

export const DialogInfoCvv = ({ bottomSheetRef, onClosePress }: Props) => {
  const { translation } = useTranslation();
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        enableTouchThrough={true}
      />
    ),
    [],
  );
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  return (
    <BottomSheet
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      ref={bottomSheetRef}
      enablePanDownToClose={false}
      index={-1}
      handleStyle={{ borderRadius: 24 }}
      backdropComponent={renderBackdrop}
      style={{ borderRadius: 32, overflow: 'hidden' }}>

      <BottomSheetView onLayout={handleContentLayout}>
        <View style={style.contentBottomSheetContainer}>
          <TouchableOpacity style={{ position: 'absolute', right: 0 }} onPress={onClosePress}>
            <SvgXml xml={close_ico_black_content} />
          </TouchableOpacity>
          <View style={{ marginTop: 36, marginBottom: 60, alignItems: 'center' }}>
            <SvgXml xml={card_reverse_crypto}></SvgXml>
            <View style={{ marginStart: 52, marginEnd: 52 }}>
              <CustomText textColor={colors.textColor02} text={translation.file.find_the_cvv_on_the_back_of_the_card} fontFamily={Fonts.PoppinsMedium} textSize={FontsSize._18_SIZE} textAlign="center" />
            </View>
          </View>

        </View>
      </BottomSheetView>
    </BottomSheet >
  );
};

const style = StyleSheet.create({

  contentBottomSheetContainer: {
    flex: 1,
    marginStart: 24,
    marginEnd: 24
  }
});
