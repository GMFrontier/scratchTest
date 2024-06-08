import { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Text
} from 'react-native';
import { LogBox } from 'react-native';
import { NavigationProps } from '../../../navigation/StackNavigator';
import { useTranslation } from '../../../../core/presentation/contexts/translations/LanguageProvider';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import Fonts from '../../../../core/constants/Fonts';
import SearchToolbar from '../../../../core/presentation/components/toolbar/SearchToolbar';
import countryCodesData from '../../../../../assets/json/countryCodes.json';

export const SelectPhoneFlagScreen = ({ navigation, route }: NavigationProps) => {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const { onSelectOption }: any = route.params;
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>(countryCodesData);
  const { translation } = useTranslation();
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleRowPress = (item: any) => {
    onSelectOption(item.flag + '*+' + item.phone + "*" + item.code);
    navigation.goBack();
  };

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
    filterData(text);
  };

  const filterData = (text: string) => {
    const filtered = data.filter(
      (item: any) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.phone.includes(text),
    );
    setFilteredData(filtered);
  };

  const renderListItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        paddingBottom: 10,
        paddingTop: 15,
        backgroundColor: 'white',
      }}
      onPress={() => handleRowPress(item)}>
      <View style={{ marginStart: 10 }}>
        <Text>{item.flag}</Text>
      </View>

      <View style={{ marginStart: 10 }}>
        <CustomText
          text={item.name}
          fontFamily={Fonts.PoppinsRegular}
          textColor="black"></CustomText>
      </View>

      <View style={{ position: 'absolute', right: 10, alignSelf: 'center' }}>
        <CustomText
          text={'+' + item.phone}
          fontFamily={Fonts.DMSansMedium}></CustomText>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.containerMain}>
      <View style={{ flex: 1 }}>
        <SearchToolbar
          title={translation.file.search_country}
          searchText={searchText}
          onChangeText={handleSearchTextChange}
        />

        <FlatList
          data={filteredData}
          keyExtractor={item => item.code}
          renderItem={renderListItem}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flexGrow: 1,
    flex: 1,
    justifyContent: 'center',
  },
});

export default SelectPhoneFlagScreen;
