import React, { useContext, useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { AutocompleteDropdown, AutocompleteDropdownRef } from 'react-native-autocomplete-dropdown';
import { SvgXml } from 'react-native-svg';
import Fonts from '../../../constants/Fonts';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import AutoCompleteViewItem from './AutoCompleteViewItem';
import { useTranslation } from '../../contexts/translations/LanguageProvider';
import { CustomText } from '../text/CustomText';
import FontsSize from '../../../constants/FontsSize';
import Sizebox from '../item/Sizebox';

interface Props {
  setSelectedItem: any,
  data: any,
  rightIcon?: any,
  showChevron?: boolean,
  leftIco?: any,
  useFilter?: boolean,
  ico?: any
  fromBanksForm?: boolean,
  clearOnFocus?: boolean,
  dropdownController?: React.MutableRefObject<AutocompleteDropdownRef | undefined>,
  labelTitle?: string,
  marginTop?: number,
}

const AutoCompleteView = ({
  setSelectedItem,
  data, rightIcon,
  showChevron = true,
  leftIco,
  useFilter = true,
  fromBanksForm,
  ico,
  clearOnFocus = false,
  dropdownController,
  labelTitle,
  marginTop
}: Props) => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);


  const { translation } = useTranslation();

  var controller = useRef<AutocompleteDropdownRef>()

  if (dropdownController) {
    controller = dropdownController
  }

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

      <AutocompleteDropdown
        clearOnFocus={clearOnFocus}
        controller={autoCompleteController => {
          controller.current = autoCompleteController
        }}
        inputContainerStyle={{
          backgroundColor: colors.accentSecondary,
          borderRadius: 12,
          borderColor: colors.captionText,
          borderWidth: 1,
          paddingTop: 5,
          paddingBottom: 5,
        }}
        textInputProps={{
          placeholder: translation.file.Select ?? 'Seleccionar',
          style: {
            fontFamily: Fonts.DMSansRegular,
            color: colors.white
          },
          placeholderTextColor: colors.textColor04
        }}
        initialValue={"0"}
        EmptyResultComponent={< View />}
        showChevron={showChevron}
        RightIconComponent={rightIcon ? <SvgXml xml={rightIcon}></SvgXml> : undefined}
        showClear={false}
        useFilter={useFilter}
        suggestionsListContainerStyle={{
          backgroundColor: colors.accentSecondary,
          marginTop: 5,
          paddingStart: 10,
          paddingBottom: 10,
          paddingTop: 10
        }}
        LeftComponent={leftIco ? <View style={{ alignSelf: 'center', paddingLeft: 16 }} >
          <SvgXml xml={leftIco}></SvgXml>
        </View > : undefined}

        onSelectItem={item => {
          if (item) {

            setSelectedItem(item);
          } else {
            dropdownController?.current?.clear()
          }
        }}
        dataSet={data}
        onRightIconComponentPress={() => {
          dropdownController.current?.toggle()
        }}
        ItemSeparatorComponent={(
          <View />
        )}
        suggestionsListMaxHeight={Dimensions.get('window').height * 0.3}
        renderItem={(item, text) => (
          <AutoCompleteViewItem item={item} fromBanksForm={fromBanksForm} ico={ico} />
        )}
      />
    </View>
  );
};



export default AutoCompleteView;