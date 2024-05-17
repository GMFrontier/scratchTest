import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { ThemeContext } from '../../../core/presentation/contexts/theme/ThemeContext';
import { useStatusBar } from '../../../core/presentation/contexts/statusBar/StatusBarContext';
import { useNewModalContext } from '../../../core/presentation/contexts/messages/useNewModalContext';
import { useTranslation } from '../../../core/presentation/contexts/translations/LanguageProvider';
import { CustomTextBold } from '../../../core/presentation/components/text/CustomTextBold';
import React = require('react');

export const SettingsScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const statusBar = useStatusBar()

  const changeStatusBarColor = () => {
    statusBar.setWhiteStatusBar()
  }

  const showStateModal = useNewModalContext().showStateModal

  const { translation } = useTranslation();


  const [bannerVisible, setBannerVisible] = React.useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  return (
    <View style={style.containerMain}>
      <CustomTextBold
        marginTop={100}
        text='HOMESCREEEN <b>funcionaaa<b>'
        textColor={colors.whiteText} />
    </View>
  );
});

const style = StyleSheet.create({
  containerMain: {
    flex: 1
  }, cardContainer: {
    marginStart: 16,
    marginEnd: 16,
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'white',

    elevation: 10,
    shadowOpacity: 0.2,
    borderRadius: 14,
  },
});