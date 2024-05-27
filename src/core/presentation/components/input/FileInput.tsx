import { useContext, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { useTranslation } from '../../contexts/translations/LanguageProvider';
import { CustomLabelText } from '../text/CustomLabelText';
import { ButtonLink } from '../button/ButtonLink';
import { useNewModalContext } from '../../contexts/messages/useNewModalContext';
import { CustomText } from '../text/CustomText';
import FontsSize from '../../../constants/FontsSize';
import Fonts from '../../../constants/Fonts';
import { SvgXml } from 'react-native-svg';
import ic_download from '../../../../../assets/svg/ic_download';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DocumentPicker from 'react-native-document-picker';
import PdfThumbnail from 'react-native-pdf-thumbnail';

interface Props {
  isEnabled?: boolean;
  marginTop?: number;
}

export const FileInput = ({
  marginTop
}: Props) => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const { translation } = useTranslation();

  const showStateModal = useNewModalContext().showStateModal
  const [uri, setURI] = useState<string | undefined>();


  const selectPDF = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: ['application/pdf', 'image/*'],
      });
      if (result[0].type === "application/pdf") {
        setURI((await PdfThumbnail.generate(result[0].uri, 0)).uri)
      } else {
        setURI(result[0].uri)
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  }

  const styles = StyleSheet.create({
    rectangleContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderStyle: "dashed",
      borderColor: colors.blue200,
      borderWidth: 2,
      borderRadius: 8,
      height: 106,
      marginVertical: 4,
      padding: 16
    },
  });

  return (
    <View style={{
      marginTop: marginTop,
    }}
    >
      <CustomLabelText
        text='Comprobante de ingresos'
        textColor={colors.white}
        showOptionalTag={true} />
      <TouchableOpacity
        style={styles.rectangleContainer}
        activeOpacity={.6}
        onPress={() => {
          selectPDF()
        }}
      >
        {uri ? <Image
          source={{ uri }}
          width={47}
          height={"100%"} /> :
          <View
            style={{ alignItems: "center" }}
          >
            <SvgXml xml={ic_download} />
            <CustomText
              textColor={colors.textColor04}
              textAlign='center'
              marginTop={8}
              text='Haz click aquí y carga tu archivo .pdf' />
          </View>
        }
      </TouchableOpacity>

      <ButtonLink
        text='¿Qué documentación puedo cargar?'
        onPress={() => {
          showStateModal({
            image: undefined,
            title: "",
            size: "30%",
            message: "",
            actionCloseModal() {

            },
            content:
              <View
                style={{
                  marginTop: 80,
                  marginBottom: 40
                }} >
                <CustomText
                  text='¿Qué documentos cargar?'
                  fontFamily={Fonts.DMSansBold}
                  textAlign='center'
                  textSize={FontsSize._24_SIZE}
                />
                <CustomText
                  marginTop={5.5}
                  text='•  Un estado de cuenta bancario'
                  textSize={FontsSize._16_SIZE}
                />
                <CustomText
                  text='•  Una carta de referencia bancaria'
                  textSize={FontsSize._16_SIZE}
                />
                <CustomText
                  text='•  Una carta laboral'
                  textSize={FontsSize._16_SIZE}
                />
                <CustomText
                  text='•  Una ficha del seguro social'
                  textSize={FontsSize._16_SIZE}
                />
                <CustomText
                  text='•  Cualquier comprobante de ingresos'
                  textSize={FontsSize._16_SIZE}
                />
              </View>,
            showIcoClose: true
          })
        }} />

    </View >
  );
}