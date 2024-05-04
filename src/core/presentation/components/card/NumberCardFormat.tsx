import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { CustomText } from '../text/CustomText';
import FontsSize from '../../../constants/FontsSize';
import { SvgXml } from 'react-native-svg';
import check_black_ico_content from '../../../../../assets/svg/xml/check_black_ico_content';
import dot_ico_cotentet from '../../../../../assets/svg/xml/dot_ico_cotentet';
import Fonts from '../../../constants/Fonts';



interface Props {
    number: string;

}

const NumberCardFormat = ({ number }: Props) => {



    return (
        <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
            <SvgXml xml={dot_ico_cotentet}></SvgXml>
            <View style={{ width: 2 }}></View>
            <SvgXml xml={dot_ico_cotentet}></SvgXml>
            <View style={{ width: 2 }}></View>
            <SvgXml xml={dot_ico_cotentet}></SvgXml>
            <View style={{ width: 2 }}></View>
            <SvgXml xml={dot_ico_cotentet}></SvgXml>


            <View style={{ width: 10 }}></View>

            <SvgXml xml={dot_ico_cotentet}></SvgXml>
            <View style={{ width: 2 }}></View>
            <SvgXml xml={dot_ico_cotentet}></SvgXml>
            <View style={{ width: 2 }}></View>
            <SvgXml xml={dot_ico_cotentet}></SvgXml>
            <View style={{ width: 2 }}></View>
            <SvgXml xml={dot_ico_cotentet}></SvgXml>

            <View style={{ width: 10 }}></View>

            <SvgXml xml={dot_ico_cotentet}></SvgXml>
            <View style={{ width: 2 }}></View>
            <SvgXml xml={dot_ico_cotentet}></SvgXml>
            <View style={{ width: 2 }}></View>
            <SvgXml xml={dot_ico_cotentet}></SvgXml>
            <View style={{ width: 2 }}></View>
            <SvgXml xml={dot_ico_cotentet}></SvgXml>

            <View style={{ width: 10 }}></View>

            <CustomText text={number} textSize={FontsSize._20_SIZE} fontFamily={Fonts.PoppinsMedium}></CustomText>



        </View>
    );
};

const style = StyleSheet.create({

    cardContainer: {
        width: '100%',
        height: 'auto',
        backgroundColor: 'white',
        padding: 32,
        justifyContent: 'center',
        elevation: 3,
        alignItems: 'center',
        borderRadius: 9,
    }

});

export default NumberCardFormat;