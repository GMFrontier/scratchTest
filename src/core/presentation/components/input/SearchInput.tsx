import React, { useContext } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import search_ico_content from '../../../../../assets/svg/xml/search_ico_content';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';
import { ThemeContext } from '../../contexts/theme/ThemeContext';

interface Props {
  placeholder?: string;
  inputValue?: any;
  onChangeText?: any;
  returnKeyType?: 'default' | 'go' | 'google' | 'join' | 'next' | 'route' | 'search' | 'send' | 'yahoo' | 'done',
}

export const SearchInput = ({
  placeholder,
  inputValue,
  onChangeText,
  returnKeyType
}: Props) => {

  const { theme: { colors } } = useContext(ThemeContext);

  return (

    <View style={styles.container}>
      <View style={{ marginStart: 24 }}>
        <SvgXml xml={search_ico_content}></SvgXml>
      </View>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"#7D889B"}
        value={inputValue}
        returnKeyType={returnKeyType}
        cursorColor={colors.primary}
        style={styles.input}
        onChangeText={onChangeText}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#E9EBEE',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 12,
    height: 56
  },
  containerError: {
    borderColor: 'red',
    backgroundColor: '#FFEFED',
    borderWidth: 2,
  },
  containerSuccess: {
    borderColor: '#4CA80B',
    backgroundColor: '#e8eee0',
    borderWidth: 2,
  },
  iconoLeft: {
    marginRight: 5,
    marginStart: 20,
    width: 20,
    resizeMode: 'contain',
    height: 20,
  },
  icoRight: {
    marginEnd: 26,
    width: 20,
    justifyContent: 'center',
    resizeMode: 'contain',
    height: 20,
  },
  input: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: FontsSize._16_SIZE,
    width: '100%',
    color: '#3D444F',
    marginStart: 8
  },
});