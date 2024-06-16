import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { ThemeContext } from '../../../core/presentation/contexts/theme/ThemeContext';
import { useNewModalContext } from '../../../core/presentation/contexts/messages/useNewModalContext';
import { useTranslation } from '../../../core/presentation/contexts/translations/LanguageProvider';
import ToolbarView from '../../../core/presentation/components/toolbar/ToolbarView';
import { CustomText } from '../../../core/presentation/components/text/CustomText';
import { FAQCard } from '../../home/presentation/components/FAQCard';
import { SvgXml } from 'react-native-svg';
import { ButtonPrimary } from '../../../core/presentation/components/button/ButtonPrimary';
import ic_email from '../../../../assets/svg/ic_email';
import FontsSize from '../../../core/constants/FontsSize';
import Fonts from '../../../core/constants/Fonts';
import ic_whatsapp from '../../../../assets/svg/ic_whatsapp';

export const SupportScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const showStateModal = useNewModalContext().showStateModal

  const { translation } = useTranslation();

  return (
    <ToolbarView
      text={'Términos y condiciones'}
    >
      <View style={{ paddingHorizontal: 16, marginTop: 24 }} >
        <CustomText
          textColor={colors.white}
          text='Estamos para ayudarte, escríbenos nuestros medios de contacto de 8:00 a 17:00 hs de Lunes a Viernes.' />
        <View style={{ flexDirection: "row", marginTop: 24, alignItems: "center" }}>
          <SvgXml xml={ic_whatsapp} />
          <View style={{ marginStart: 8, flex: 1, }}>
            <CustomText
              fontFamily={Fonts.DMSansMedium}
              textSize={FontsSize._16_SIZE}
              textColor={colors.white}
              text='Whatsapp' />
            <CustomText
              text='0000-0000' />
          </View>
          <ButtonPrimary
            text='Chat'
            size='small'
            position='relative'
            onPress={() => { }} />
        </View>
        <View style={{ flexDirection: "row", marginTop: 16, alignItems: "center" }}>
          <SvgXml xml={ic_email} />
          <View style={{ marginStart: 8, flex: 1, }}>
            <CustomText
              fontFamily={Fonts.DMSansMedium}
              textSize={FontsSize._16_SIZE}
              textColor={colors.white}
              text='Correo electronico' />
            <CustomText
              text='help@zero.com' />
          </View>
          <ButtonPrimary
            text='Enviar'
            size='small'
            position='relative'
            onPress={() => { }} />
        </View>
      </View>
    </ToolbarView>
  );
});

const style = StyleSheet.create({
  containerMain: {
    flex: 1,
    paddingHorizontal: 16
  },
});