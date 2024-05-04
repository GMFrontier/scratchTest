import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../text/CustomText';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';
import { SvgXml } from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import SelectDropdown from 'react-native-select-dropdown';
import DropdownItem from './DropdownItem';
import dot_indicator_select_up from '../../../../../assets/svg/xml/dot_indicator_select_up';
import dot_indicator_select_down from '../../../../../assets/svg/xml/dot_indicator_select_down';

interface Props {
    setSelectedItem: any,
    data: any,
    defaultValue?: string
}

const BasicSpinnerComponent = ({ setSelectedItem, data, defaultValue }: Props) => {

    return (
        <SelectDropdown
            data={data}
            showsVerticalScrollIndicator={false}
            dropdownOverlayColor='transparent'
            onSelect={(selectedItem, index) => {

                setSelectedItem(selectedItem, index);

            }}
            dropdownStyle={styles.dropdown3BtnStyle}
            rowStyle={styles.dropdown3RowStyle}
            defaultButtonText={defaultValue ?? ''}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
                return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
                return <SvgXml xml={isOpened ? dot_indicator_select_up : dot_indicator_select_down} />;
            }}
            rowTextStyle={styles.dropdown1RowTxtStyle}
            renderCustomizedRowChild={(item, index) => {
                return (
                    <DropdownItem label={item}></DropdownItem>
                );
            }}
        />
    );
};

const styles = StyleSheet.create({
    toastContent: {
        paddingTop: 15,
        paddingBottom: 15,
        width: '90%',
        flex: 1,
        flexDirection: 'row',
        borderRadius: 12,
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#FFC400',
    },
    textClickStyle: {
        fontWeight: '500',
        marginStart: 2,
        fontSize: FontsSize._12_SIZE,
        top: 4,
        fontFamily: Fonts.PoppinsMedium,
        color: 'black',
    }, dropdown3BtnStyle: {
        backgroundColor: 'white',
        borderBottomColor: 'white',
        borderRadius: 14,
        marginTop: 10,
        height: 'auto',

    }, dropdown3RowStyle: {
        backgroundColor: 'white',
        width: '100%',
        borderBottomColor: 'white',
        marginTop: 10,

    }, dropdown1BtnStyle: {
        width: '100%',
        height: 56,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#C4C9D1',
        borderRadius: 8,
    }, dropdown1BtnTxtStyle: {
        color: '#3D444F',
        textAlign: 'left',
        fontSize: FontsSize._16_SIZE,
        fontFamily: Fonts.PoppinsMedium
    }, dropdown1RowTxtStyle: {
        color: '#3D444F',
        textAlign: 'left',
        fontFamily: Fonts.PoppinsRegular,

        fontSize: FontsSize._16_SIZE,
    },
});


export default BasicSpinnerComponent;
