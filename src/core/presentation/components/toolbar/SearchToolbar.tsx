import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import Fonts from '../../../constants/Fonts';
import { SvgXml } from 'react-native-svg';
import arrow_back_ico_content from '../../../../../assets/svg/xml/arrow_back_ico_content';
import close_ico_black_content from '../../../../../assets/svg/xml/close_ico_black_content';
import { useNavigation } from '@react-navigation/native';


interface Props {
  title: string;
  onBackPress?: () => void;
  searchText: any,
  onChangeText?: any;
}

const SearchToolbar = ({ title, searchText, onChangeText }: Props) => {

  const navigation = useNavigation();

  const handleClearText = () => {
    onChangeText && onChangeText('');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={style.toolbarContainer}>
      <TouchableOpacity onPress={handleBackPress} style={style.backButton}>
        <SvgXml xml={arrow_back_ico_content} />
      </TouchableOpacity>
      <TextInput
        placeholderTextColor="#7D889B"
        underlineColorAndroid="transparent"
        placeholder={title}
        style={style.title}
        value={searchText}
        onChangeText={onChangeText}
      />
      {searchText !== '' && (
        <TouchableOpacity onPress={handleClearText} style={style.clearButton}>
          <SvgXml xml={close_ico_black_content} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  toolbarContainer: {
    flexDirection: 'row',
    height: 56,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    elevation: 4,
  },
  backButton: {
    marginStart: 20,
    position: 'absolute',
    padding: 10,
    alignSelf: 'center',
    left: 0,
  }, clearButton: {
    marginEnd: 20,
    position: 'absolute',
    alignSelf: 'center',
    right: 0,
  },
  title: {
    fontSize: 14,
    width: '80%',
    marginStart: 30,
    borderBottomWidth: 0,
    color: '#3D444F',
    backgroundColor: 'white',
    fontFamily: Fonts.PoppinsRegular,
  },
});

export default SearchToolbar;
