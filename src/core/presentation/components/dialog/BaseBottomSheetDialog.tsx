import React, { useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop, } from '@gorhom/bottom-sheet';


type ComponentePadreProps = {
  children: React.ReactNode;
  bottomSheetRef: any
  onClosePress?: () => void;
  enableOverlayTap?: 'none' | 'close' | 'collapse'
};

export const BaseBottomSheetDialog: React.FC<ComponentePadreProps> = ({ children, bottomSheetRef, onClosePress, enableOverlayTap = 'close' }) => {

  const snapPoints = useMemo(() => ['25%', '50%'], []);

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


  return (

    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      index={-1}
      onChange={handleAnimateEnd}
      handleStyle={{}}
      backdropComponent={renderBackdrop}
      style={{ borderRadius: 0, overflow: 'hidden' }}
      animateOnMount={true}>
      <BottomSheetView>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
};
