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
import Fonts from '../../../core/constants/Fonts';
import FontsSize from '../../../core/constants/FontsSize';
import { FAQItem } from '../../home/presentation/components/FAQItem';
import ic_arrow_down_dropdown from '../../../../assets/svg/ic_arrow_down_dropdown';
import Sizebox from '../../../core/presentation/components/item/Sizebox';

export const FAQScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const showStateModal = useNewModalContext().showStateModal

  const { translation } = useTranslation();

  const handleModal = () => {
    showStateModal({
      image: undefined,
      title: "k",
      size: "75%",
      message: "d",
      actionCloseModal() {

      },
      content:
        <View
          style={{
            marginTop: 80,
            marginBottom: 40
          }} >
          <CustomText
            text='¿Puedo perder mi limite de crédito?'
            fontFamily={Fonts.DMSansBold}
            textAlign='center'
            textSize={FontsSize._24_SIZE}
          />
          <CustomText
            marginTop={8}
            text={'Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.\n\nAliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.'}
            textSize={FontsSize._16_SIZE}
          />
        </View>,
      showIcoClose: true
    })
  }

  return (
    <ToolbarView
      text={'Preguntas frecuentes'}
    >
      <View style={{ paddingHorizontal: 16, marginTop: 24 }} >
        <FAQItem text='¿Cómo acumular puntos?' onPress={handleModal} icon={ic_arrow_down_dropdown} />
        <Sizebox height={8} />
        <FAQItem text='¿Cómo realizo aumentar mi credito?' onPress={handleModal} icon={ic_arrow_down_dropdown} />
        <Sizebox height={8} />
        <FAQItem text='¿Cómo pagar mi factura vencida?' onPress={handleModal} icon={ic_arrow_down_dropdown} />
        <Sizebox height={8} />
        <FAQItem text='¿Cómo se puedo canjear mis puntos?' onPress={handleModal} icon={ic_arrow_down_dropdown} />
        <Sizebox height={8} />
        <FAQItem text='¿Puedo perder mis puntos?' onPress={handleModal} icon={ic_arrow_down_dropdown} />
        <Sizebox height={8} />
        <FAQItem text='¿Cómo dar de baja mi tarjeta?' onPress={handleModal} icon={ic_arrow_down_dropdown} />
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