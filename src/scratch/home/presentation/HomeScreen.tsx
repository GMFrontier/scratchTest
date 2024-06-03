import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { ThemeContext } from '../../../core/presentation/contexts/theme/ThemeContext';
import { useStatusBar } from '../../../core/presentation/contexts/statusBar/StatusBarContext';
import { useNewModalContext } from '../../../core/presentation/contexts/messages/useNewModalContext';
import { useTranslation } from '../../../core/presentation/contexts/translations/LanguageProvider';
import Sizebox from '../../../core/presentation/components/item/Sizebox';
import { SvgXml } from 'react-native-svg';
import { BalanceUserCard } from './components/BalanceUserCard';
import { BannerCard } from './components/BannerCard';
import { MovementsList } from './components/MovementsList';
import { Movements } from './components/MovementsItem';
import { FAQCard } from './components/FAQCard';
import bg_home from '../../../../assets/svg/bg_home';
import { ExpirationPaymentCard } from './components/ExpirationPaymentCard';

export const HomeScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const statusBar = useStatusBar()

  useEffect(() => {
    statusBar.setHomeStatusBar()
    return () => {
      statusBar.setPrimaryStatusBar()
    }
  })

  const { translation } = useTranslation();

  const movements: Movements[] = [
    { id: "85412345", title: "Factura Claro Panamá", type: "none", status: "approved", amount: 23.31 },
    { id: "854123435", title: "Luxery Shop Electrict", type: "shopping", status: "rejected", amount: -23.31 },
    { id: "854123452", title: "Factura Claro Panamá", type: "none", status: "approved", amount: 23.31 },
  ]
  return (
    <ScrollView style={style.containerMain} showsVerticalScrollIndicator={false}>
      <Image
        source={require('../../../../assets/img/bg_home.png')}
        style={{
          width: "100%",
          position: "absolute"
        }}
      />
      <View
        style={{
          padding: 16
        }}>
        <BalanceUserCard />
        <ExpirationPaymentCard />
        <BannerCard />
        <MovementsList items={movements} />
        <FAQCard />
        <Sizebox height={150} />
      </View>
    </ScrollView>
  );
});

const style = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
});