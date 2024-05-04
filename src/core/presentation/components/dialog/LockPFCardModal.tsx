import React, { useState, useMemo, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import close_ico_black_content from '../../../../../assets/svg/xml/close_ico_black_content';
import BottomSheet, {
    BottomSheetView,
    useBottomSheetDynamicSnapPoints,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { Switch } from 'react-native-switch';
import { CustomText } from '../text/CustomText';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';

interface Props {
    bottomSheetRef: any;
    onToggle: () => void;
    onClosePress: () => void;
    value: boolean;
    title: string;
}

export const LockPFCardModal = ({ bottomSheetRef, onClosePress, value, onToggle, title }: Props) => {
    const { theme: { colors } } = useContext(ThemeContext);
    const handleToggle = () => {
        onToggle();
    };

    const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
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
            style={{ borderRadius: 24, overflow: 'hidden' }}>

            <BottomSheetView onLayout={handleContentLayout}>
                <View style={style.contentBottomSheetContainer}>
                    <View style={{ width: '100%', alignItems: "flex-end" }}>
                        <TouchableOpacity onPress={onClosePress}>
                            <SvgXml xml={close_ico_black_content} width={32} height={32} />
                        </TouchableOpacity>
                    </View>
                    <View style={style.containerOption}>
                        <CustomText textColor={colors.textColor01} text={title} fontFamily={Fonts.PoppinsMedium} textSize={FontsSize._16_SIZE} />
                        <Switch
                            value={value}
                            renderActiveText={false}
                            renderInActiveText={false}
                            onValueChange={() => handleToggle()}
                            backgroundActive={colors.primary}
                            backgroundInactive={colors.lightGray05}
                            circleBorderWidth={0.5}
                            switchWidthMultiplier={1.7}
                            switchBorderRadius={30}
                            circleBorderActiveColor={colors.primary}
                            circleBorderInactiveColor={colors.lightGray05}
                            barHeight={35}
                            switchRightPx={3}
                            switchLeftPx={3}
                            circleSize={32}
                        />
                    </View>
                </View>
            </BottomSheetView>
        </BottomSheet>
    );
};

const style = StyleSheet.create({
    contentBottomSheetContainer: {
        flex: 1,
        padding: 24
    }, containerOption: {
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 24,
    },
});
