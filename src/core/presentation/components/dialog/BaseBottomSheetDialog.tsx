import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetBackgroundProps, } from '@gorhom/bottom-sheet';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import Animated, {
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";

type ComponentePadreProps = {
  children: React.ReactNode;
  bottomSheetRef: any
  size: any
  onClosePress?: () => void;
  enableOverlayTap?: 'none' | 'close' | 'collapse'
};

export const BaseBottomSheetDialog: React.FC<ComponentePadreProps> = ({ children, bottomSheetRef, onClosePress, enableOverlayTap = 'close', size }) => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const [snapPoint, setSize] = useState<string | undefined>();

  useEffect(() => {
    setSize(size)
  })
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        enableTouchThrough={true}
        pressBehavior={enableOverlayTap}

      />
    ),
    [enableOverlayTap],
  );

  const handleAnimateEnd = (toIndex: any) => {

    if (toIndex === -1) {

      if (onClosePress != undefined) {
        onClosePress()
      }

    }
  };

  const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
    style,
    animatedIndex,
  }) => {
    const containerAnimatedStyle = useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(
        animatedIndex.value,
        [0, 1],
        [colors.accentSecondary, colors.accentSecondary]
      ),
    }));
    const containerStyle = useMemo(
      () => [style, containerAnimatedStyle],
      [style, containerAnimatedStyle]
    );

    return <Animated.View pointerEvents="none" style={containerStyle} />;
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      enablePanDownToClose={false}
      index={-1}
      snapPoints={[snapPoint ?? "40%"]}
      onChange={handleAnimateEnd}
      backdropComponent={renderBackdrop}
      handleComponent={null}
      backgroundComponent={CustomBackground}
      animateOnMount={true}>
      <BottomSheetView>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
};
