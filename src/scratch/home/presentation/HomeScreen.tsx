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
import { useBiometrics } from '../../../core/presentation/utils/biometric/BiometricUtils';
import container from '../../di/inversify.config';
import HomeViewModel from './HomeViewModel';
import { TYPES } from '../../di/types';
import { useFocusEffect } from '@react-navigation/native';

export const HomeScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const statusBar = useStatusBar()
  const { saveUserBiometrics } = useBiometrics()

  const viewModel = container.get<HomeViewModel>(
    TYPES.HomeViewModel,
  );

  useFocusEffect(() => {
    statusBar.setHomeStatusBar()
  })


  useEffect(() => {
    saveUserBiometrics(
      "Desea utilizar su huella digital para iniciar sesión?" ?? "",
      "Asociación completada" ?? ""
    )
    viewModel.getUser()
    viewModel.getBalance()
    viewModel.getMovements()
    viewModel.getPeriods()
  }, [])

  // const movements: Movements[] = [
  //   { id: "85412345", title: "Factura Claro Panamá", type: "none", status: "approved", amount: 23.31 },
  //   { id: "854123435", title: "Luxery Shop Electrict", type: "shopping", status: "rejected", amount: -23.31 },
  //   { id: "854123452", title: "Factura Claro Panamá", type: "none", status: "approved", amount: 23.31 },
  // ]
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
        {
          viewModel.periods.length > 0 &&
          <ExpirationPaymentCard />
        }
        {
          !viewModel.user?.isCardOrderInit &&
          <BannerCard />
        }

        {/* PENDING = "pending"VERIFIED = "verified"REJECTED = "rejected"REVIEW_NEEDED = "reviewNeeded"VERIFICATION_INPUTS_COMPLETED = "verification_inputs_completed"NOT_REGISTER = "not_register" */}
        {/*  pre_approve_credit previo a balance */}
        <MovementsList items={viewModel.movements.slice(0, 4)} />
        <Sizebox height={16} />
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