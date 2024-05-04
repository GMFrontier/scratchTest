import { TouchableOpacity } from '@gorhom/bottom-sheet';
import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import edit_input_profile_ico from '../../../../../assets/svg/xml/edit_input_profile_ico';
import { CustomText } from '../text/CustomText';
import FontsSize from '../../../constants/FontsSize';
import Fonts from '../../../constants/Fonts';

interface Props {
  textTitle: string;
  textInput?: string;
  onChangeText?: any;
  editable?: boolean;
  textStart?: number;
  marginTop?: number;
}

const ProfileInput = ({
  textTitle,
  textInput,
  editable = true,
  textStart = 0,
  onChangeText,
  marginTop = 10,
}: Props) => {
  const [isEditable, setIsEditable] = useState(false);


  var topIco = marginTop;

  if (topIco == 10) topIco = 0;

  const refInput = useRef<TextInput>(null);



  const handleEditPress = () => {
    setIsEditable(true);
    setTimeout(() => {
      refInput.current?.focus();
    }, 200);
  };

  const handleBlur = () => {
    setIsEditable(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginStart: 24, flexDirection: 'row' }}>
        <View>
          <View style={{ position: 'absolute', left: 3, width: 200 }}>
            <CustomText
              text={textTitle}
              textColor="#7D889B"
              fontFamily={Fonts.PoppinsRegular}
            />
          </View>
          <TextInput
            style={{ ...styles.textInput, marginStart: textStart, marginTop }}
            ref={refInput}
            editable={isEditable}
            onChangeText={onChangeText}
            value={textInput}
            onBlur={handleBlur}
          />
        </View>
        {editable && (
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 555,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              right: 0,
              marginTop: topIco,
              marginEnd: 24,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <TouchableOpacity onPress={handleEditPress}>
              <SvgXml xml={edit_input_profile_ico} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 18,
  },
  textInput: {
    marginTop: 10,
    fontFamily: Fonts.PoppinsMedium,
    fontSize: FontsSize._16_SIZE,
    color: '#3D444F',
  },
  editIcon: {
    width: 32,
    height: 32,
    backgroundColor: 'white',
    resizeMode: 'center',
  },
  separator: {
    marginTop: 10,
    height: 1,
    marginStart: 24,
    marginEnd: 24,
    backgroundColor: '#d7dae0',
  },
});

export default ProfileInput;
