import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { AutocompleteDropdown, AutocompleteDropdownRef } from 'react-native-autocomplete-dropdown';
import { SvgXml } from 'react-native-svg';
import Fonts from '../../../constants/Fonts';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import AutoCompleteViewItem from './AutoCompleteViewItem';
import { useTranslation } from '../../contexts/translations/LanguageProvider';
import { CustomText } from '../text/CustomText';
import FontsSize from '../../../constants/FontsSize';
import Sizebox from '../item/Sizebox';
import ic_arrow_down_dropdown from '../../../../../assets/svg/ic_arrow_down_dropdown';
import ic_arrow_down_dropdown_disabled from '../../../../../assets/svg/ic_arrow_down_dropdown_disabled';
import SelectDropdown from 'react-native-select-dropdown';

interface Props {
  setItem: any,
  data: any,
  labelTitle?: string,
  marginTop?: number,
  disabled?: boolean,
  defaultValue?: string,
}

const SelectCustomDropdown = ({
  setItem,
  data,
  labelTitle,
  marginTop,
  disabled = false,
}: Props) => {
  const [selectedItem, setSelectedItem] = useState<any>();

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const { translation } = useTranslation();


  const style = StyleSheet.create({
    containerMain: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    buttonTextStyle: {
      color: selectedItem ? colors.white : colors.secondaryText,
      textAlign: 'left',
      fontSize: FontsSize._16_SIZE,
      fontFamily: Fonts.DMSansRegular,
      opacity: selectedItem ? 1 : .8,
    },
    buttonStyle: {
      width: '100%',
      height: 56,
      backgroundColor: colors.accentSecondary,
      borderRadius: 12,
      borderColor: colors.captionText,
      borderWidth: 1,
    },
    rowTextStyle: {
      color: colors.white,
      textAlign: 'left',
      fontFamily: Fonts.DMSansRegular,
      fontSize: FontsSize._16_SIZE,
      marginStart: 16,
    },
    rowStyle: {
      backgroundColor: colors.accentSecondary,
      width: '100%',
      marginTop: 10,
      paddingBottom: 10,
      alignItems: "center"
    },
    dropdownStyle: {
      backgroundColor: colors.accentSecondary,
      borderRadius: 14,
      marginTop: 10,
      height: 'auto',
    },
  });

  return (
    <View>
      {labelTitle ? <View style={{ flexDirection: 'row', marginTop: marginTop }}>
        <CustomText
          text={labelTitle}
          fontFamily={Fonts.DMSansMedium}
          textSize={FontsSize._14_SIZE}
          textColor={colors.white}
          marginBottom={4}></CustomText>
        <Sizebox width={5}></Sizebox>
        {labelTitle ? <CustomText text={"*"} fontFamily={Fonts.DMSansMedium} textSize={FontsSize._14_SIZE} textColor={colors.alertColor} marginBottom={4}></CustomText> : null}
      </View> : null}
      <SelectDropdown
        data={data}
        showsVerticalScrollIndicator={false}
        dropdownOverlayColor='transparent'
        onSelect={(selectedItem, index) => {
          setSelectedItem(selectedItem)
          setItem(selectedItem)
        }}
        defaultButtonText={"Seleccionar"}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.title;
        }}
        rowTextForSelection={(item, index) => {
          return item.title;
        }}
        dropdownStyle={style.dropdownStyle}
        rowStyle={style.rowStyle}
        buttonStyle={style.buttonStyle}
        buttonTextStyle={style.buttonTextStyle}
        rowTextStyle={style.rowTextStyle}
        renderDropdownIcon={isOpened => {
          return <SvgXml xml={isOpened ? ic_arrow_down_dropdown : ic_arrow_down_dropdown_disabled} />;
        }}
      />
    </View>
  );
};



export default SelectCustomDropdown;