import { useContext } from 'react';
import { View } from 'react-native';
import FontsSize from '../../../../core/constants/FontsSize';
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import Fonts from '../../../../core/constants/Fonts';
import { FAQItem } from './FAQItem';
import { useNewModalContext } from '../../../../core/presentation/contexts/messages/useNewModalContext';

interface Props {
}

export const FAQCard = ({
}: Props) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const showStateModal = useNewModalContext().showStateModal

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
    <View style={{ marginTop: 18 }} >
      <CustomText
        text='Preguntas frecuentes'
        fontFamily={Fonts.DMSansMedium}
        textSize={FontsSize._16_SIZE} />
      <View
        style={{
          backgroundColor: colors.accentSecondary,
          borderRadius: 8,
          padding: 16,
          marginTop: 6,
        }}
      >
        <FAQItem text='¿Cómo sé cuando aprueban mi límite?' onPress={handleModal} />
        <FAQItem text='¿Cómo aumenta mi crédito?' onPress={handleModal} />
        <FAQItem text='¿Puedo perder mi limite de crédito?' onPress={handleModal} />
        <FAQItem text='¿Cómo puedo subir de nivel?' onPress={handleModal} />
      </View>
    </View>
  )
};
