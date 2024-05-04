import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../text/CustomText';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { ButtonPrimary } from '../button/ButtonPrimary';
import { ButtonSecondary } from '../button/ButtonSeconday';
import { useTranslation } from '../../contexts/translations/LanguageProvider';
import FontsSize from '../../../constants/FontsSize';
import Fonts from '../../../constants/Fonts';


interface Props {
  bottomSheetRef: any;
  onPress: () => void;
  onPressCamera: () => void;
}

export const BottomSheetPickerPhotoDialog = ({
  bottomSheetRef,
  onPress,
  onPressCamera
}: Props) => {

  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);


  const { translation } = useTranslation();

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

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      index={-1}
      handleStyle={{ borderRadius: 24 }}
      backdropComponent={renderBackdrop}
      style={{ borderRadius: 32, overflow: 'hidden' }}
      animateOnMount={true}>
      <BottomSheetView>
        <View style={style.contentBottomSheetContainer}>
          <CustomText text={translation.file.select_how_to_choose_image} marginTop={20} fontFamily={Fonts.PoppinsMedium} textSize={FontsSize._16_SIZE} />

          <View style={{ width: '85%', marginTop: 20 }}>
            <ButtonPrimary text={translation.file.galery ?? 'Galeria'}
              onPress={onPress}
            />
            <View style={{ marginTop: 10 }}></View>
            <ButtonSecondary

              text={translation.file.camera ?? 'Camara'}
              onPress={onPressCamera} />
            <View style={{ marginTop: 10 }}></View>
            <View style={{ marginTop: 10 }}></View>
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
