import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image, LogBox } from 'react-native';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { useTranslation } from '../../../../core/presentation/contexts/translations/LanguageProvider';
import { DateGroup, MovementsItem } from '../components/MovementsItem';
import ToolbarView from '../../../../core/presentation/components/toolbar/ToolbarView';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import FontsSize from '../../../../core/constants/FontsSize';
import Fonts from '../../../../core/constants/Fonts';
import { truncateCustomDate } from '../../../../core/data/utils/Utils';
import HomeViewModel from '../HomeViewModel';
import container from '../../../di/inversify.config';
import { TYPES } from '../../../di/types';

export const MovementsScreen = observer(() => {

  const viewModel = container.get<HomeViewModel>(
    TYPES.HomeViewModel,
  );

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const { translation } = useTranslation();

  // const movements: Movements[] = [
  //   { id: (Math.floor(Math.random() * 1000) + 1).toString(), title: "Factura Claro Panamá", type: "none", status: "approved", amount: 23.31 },
  //   { id: (Math.floor(Math.random() * 1000) + 1).toString(), title: "Luxery Shop Electrict", type: "shopping", status: "rejected", amount: -23.31 },
  //   { id: (Math.floor(Math.random() * 1000) + 1).toString(), title: "Factura " + (Math.floor(Math.random() * 1000) + 1).toString(), type: "food", status: "approved", amount: (Math.floor(Math.random() * 100) + 1) },
  //   { id: (Math.floor(Math.random() * 1000) + 1).toString(), title: "Factura " + (Math.floor(Math.random() * 1000) + 1).toString(), type: "bills", status: "approved", amount: (Math.floor(Math.random() * 100) + 1) },
  //   { id: (Math.floor(Math.random() * 1000) + 1).toString(), title: "Factura " + (Math.floor(Math.random() * 1000) + 1).toString(), type: "services", status: "approved", amount: (Math.floor(Math.random() * 100) + 1) },
  //   { id: (Math.floor(Math.random() * 1000) + 1).toString(), title: "Factura " + (Math.floor(Math.random() * 1000) + 1).toString(), type: "market", status: "approved", amount: (Math.floor(Math.random() * 100) + 1) },
  //   { id: (Math.floor(Math.random() * 1000) + 1).toString(), title: "Factura " + (Math.floor(Math.random() * 1000) + 1).toString(), type: "transport", status: "rejected", amount: (Math.floor(Math.random() * 100) + 1) },
  //   { id: (Math.floor(Math.random() * 1000) + 1).toString(), title: "Factura " + (Math.floor(Math.random() * 1000) + 1).toString(), type: "trips", status: "approved", amount: (Math.floor(Math.random() * 100) + 1) },
  //   { id: (Math.floor(Math.random() * 1000) + 1).toString(), title: "Factura " + (Math.floor(Math.random() * 1000) + 1).toString(), type: "none", status: "approved", amount: (Math.floor(Math.random() * 100) + 1) },
  //   { id: (Math.floor(Math.random() * 1000) + 1).toString(), title: "Factura " + (Math.floor(Math.random() * 1000) + 1).toString(), type: "bills", status: "approved", amount: (Math.floor(Math.random() * 100) + 1) },
  //   { id: (Math.floor(Math.random() * 1000) + 1).toString(), title: "Factura " + (Math.floor(Math.random() * 1000) + 1).toString(), type: "services", status: "rejected", amount: (Math.floor(Math.random() * 100) + 1) },
  //   { id: (Math.floor(Math.random() * 1000) + 1).toString(), title: "Factura " + (Math.floor(Math.random() * 1000) + 1).toString(), type: "market", status: "approved", amount: (Math.floor(Math.random() * 100) + 1) },
  //   { id: (Math.floor(Math.random() * 1000) + 1).toString(), title: "Factura " + (Math.floor(Math.random() * 1000) + 1).toString(), type: "none", status: "approved", amount: 23.31 },
  // ]

  const dateGroup: DateGroup[] = viewModel.movements.reduce((groups, notification) => {
    const date = new Date(notification.created_at);
    // const locales = RNLocalize.getLocales();
    // const currentLocale = `${locales[0].languageCode}-${locales[0].countryCode}`;
    const currentLocale = `${"en"}-${"US"}`;
    const monthYear = date.toLocaleString(currentLocale, { month: 'long', year: 'numeric' });
    const existingGroup = groups.find((group) => group.monthYear === monthYear);
    if (existingGroup) {
      existingGroup.dataList.push(notification);
    } else {
      groups.push({ monthYear, dataList: [notification] });
    }

    return groups;
  }, [] as DateGroup[]);

  const movementsGroup: Map<string, Movement[]> = new Map();

  dateGroup.forEach((dataModel) => {

    const { monthYear, dataList } = dataModel;

    if (movementsGroup.has(monthYear)) {
      const existingNotifications = movementsGroup.get(monthYear)!
      const newTransactions = dataList.filter(
        (newTransaction) =>
          !existingNotifications.some(
            (existingNotification) => existingNotification.id === newTransaction.id
          )
      );

      movementsGroup.set(monthYear, [...existingNotifications, ...newTransactions]);
    } else {
      movementsGroup.set(monthYear, dataList);
    }
  });

  const renderItem = ({ item }: any) => {

    var monthDate = translation.file[item[0].toString()]
    if (monthDate === undefined) monthDate = truncateCustomDate(item[0])
    return (
      <View>
        <View style={{ marginBottom: 6, marginTop: 24 }}>
          <CustomText text={monthDate} textSize={FontsSize._16_SIZE} fontFamily={Fonts.DMSansMedium} />
        </View>
        {item[1].map((notification: Movement) => (
          <MovementsItem item={notification} />
        ))}
      </View>
    );
  };

  const title = "Movimientos"
  return (
    <ToolbarView
      text={title} >
      <FlatList
        style={{ marginHorizontal: 16 }}
        data={[...movementsGroup]}
        keyExtractor={(item) => `${item[0]}`}
        // onEndReached={handleEndReached}
        showsVerticalScrollIndicator={false}
        // ListFooterComponent={viewModel.isLoading ? LoadingFooter : null}
        renderItem={renderItem} />
    </ToolbarView>
  );
});

const style = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
});