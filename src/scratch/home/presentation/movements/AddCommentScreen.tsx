import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { useStatusBar } from '../../../../core/presentation/contexts/statusBar/StatusBarContext';
import { useTranslation } from '../../../../core/presentation/contexts/translations/LanguageProvider';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import ToolbarView from '../../../../core/presentation/components/toolbar/ToolbarView';
import FontsSize from '../../../../core/constants/FontsSize';
import Fonts from '../../../../core/constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import { TextInputMain } from '../../../../core/presentation/components/input/TextInputMain';
import Constants from '../../../../core/constants/Constants';
import { ButtonPrimary } from '../../../../core/presentation/components/button/ButtonPrimary';
import { useNewModalContext } from '../../../../core/presentation/contexts/messages/useNewModalContext';
import ic_success_check_filled from '../../../../../assets/svg/ic_success_check_filled';
import HomeViewModel from '../HomeViewModel';
import container from '../../../di/inversify.config';
import { TYPES } from '../../../di/types';
import ic_exclamation_error_filled_48 from '../../../../../assets/svg/ic_exclamation_error_filled_48';

export const AddCommentScreen = observer(() => {

  const [comment, setComment] = useState("")
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const statusBar = useStatusBar()
  const navigation = useNavigation()
  const showStateModal = useNewModalContext().showStateModal

  const viewModel = container.get<HomeViewModel>(
    TYPES.HomeViewModel,
  );

  useEffect(() => {
    if (viewModel.movement.comment) setComment(viewModel.movement.comment)
  }, [])

  useEffect(() => {
    return reaction(
      () => viewModel.successResponse,
      () => {
        showStateModal({
          title: "Comentario guardado",
          message: "Se ha guardado el comentario con éxito.",
          image: ic_success_check_filled,
          showIcoClose: true,
          enableOverlayTap: "none",
          actionCloseModal() {
            navigation.goBack()
          },
          size: "30%",
        })
      }
    )
  }, [])

  useEffect(() => {
    return reaction(
      () => viewModel.errorResponse,
      () => {
        showStateModal({
          title: "Ha ocurrido un problema",
          message: "No se ha guardado el comentario, aguarda unos minutos he inténtalo nuevamente.",
          image: ic_exclamation_error_filled_48,
          showIcoClose: true,
          size: "30%"
        })
      }
    )
  }, [])


  return (
    <ToolbarView
      text='Comentarios'>
      <View
        style={{
          padding: 16,
        }}>

        <View style={{ flexDirection: "row" }}>
          <CustomText
            textColor={colors.white}
            textSize={FontsSize._14_SIZE}
            fontFamily={Fonts.DMSansMedium}
            text='Escribir un comentario' />
          <View style={{ position: 'absolute', right: 0 }}>
            <CustomText text={comment.length + " / " + Constants.INPUT_MAX_TEXT} textSize={FontsSize._12_SIZE} />
          </View>
        </View>
        <TextInputMain
          heightInput={120}
          multiline={true}
          textAlign='top'
          marginTop={4}
          inputValue={comment}
          onChangeText={setComment}
          maxLength={Constants.INPUT_MAX_TEXT}
          showBottomIco={true}
          placeholder={"Ej. Factura celular mes de mayo"}
        />
      </View>
      <ButtonPrimary
        text='Guardar'
        marginHorizontal={16}
        onPress={() => {
          viewModel.saveComment(comment)
        }} />
    </ToolbarView>
  );
});

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
  linearGradient: {
    top: 56,
    height: 184,
    width: "100%",
    position: "absolute",
    zIndex: -1
  }
});