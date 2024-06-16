import { useContext } from 'react';
import { View, StyleSheet, } from 'react-native';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import React = require('react');
import { useNavigation } from '@react-navigation/core';
import { ThemeContext } from '../../../core/presentation/contexts/theme/ThemeContext';
import { useToastContext } from '../../../core/presentation/contexts/messages/useToastContext';
import { useTranslation } from '../../../core/presentation/contexts/translations/LanguageProvider';
import ToolbarView from '../../../core/presentation/components/toolbar/ToolbarView';

export const PointsScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const toastMessage = useToastContext().showMessageToast
  const { translation } = useTranslation();

  const navigation = useNavigation()

  return (
    <ToolbarView
      text='Mis puntos'>
      {/* <LinearGradient colors={[colors.blueHome, '#282828A6']} style={styles.linearGradient} /> */}
    </ToolbarView>
  );
}); 