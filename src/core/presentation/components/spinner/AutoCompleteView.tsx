import React, { useContext, useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { AutocompleteDropdown, AutocompleteDropdownRef } from 'react-native-autocomplete-dropdown';
import { SvgXml } from 'react-native-svg';
import Fonts from '../../../constants/Fonts';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import AutoCompleteViewItem from './AutoCompleteViewItem';
import { useTranslation } from '../../contexts/translations/LanguageProvider';


/*

Usar esta devolucion al usar el componente en el item setSelectedItem

const handleSelectedItem = (item:any) => {
    console.log("Item seleccionado:", item);
   
};

la lista que se le pasa a este componente debe tener dos atributos id, y title. El id es un consecutivo del 0 al n numero de elementos de la lista

*/

interface Props {
    setSelectedItem: any,
    data: any,
    rightIcon?: any,
    showChevron?: boolean,
    leftIco?: any,
    useFilter?: boolean,
    ico?: any
    fromBanksForm?: boolean
}

const AutoCompleteView = ({ setSelectedItem, data, rightIcon, showChevron = true, leftIco, useFilter = true, fromBanksForm, ico }: Props) => {

    const {
        theme: { colors },
    } = useContext(ThemeContext);
    const dropdownController = useRef<AutocompleteDropdownRef>()


    const { translation } = useTranslation();



    return (
        <AutocompleteDropdown
            clearOnFocus={false}
            controller={controller => {
                dropdownController.current = controller
            }}
            inputContainerStyle={{
                backgroundColor: colors.white,
                borderRadius: 8,
                borderColor: colors.textColor04,
                borderWidth: .4,
                paddingTop: 5,

                paddingBottom: 5,

            }}
            textInputProps={{
                placeholder: translation.file.Select ?? 'Seleccionar',
                style: {

                    fontFamily: Fonts.PoppinsRegular
                }
            }}

            initialValue={"0"}
            EmptyResultComponent={< View />}
            showChevron={showChevron}
            RightIconComponent={rightIcon ? <SvgXml xml={rightIcon}></SvgXml> : undefined}
            showClear={false}
            useFilter={useFilter}
            suggestionsListContainerStyle={{
                backgroundColor: 'white',
                marginTop: 5,
                paddingStart: 10,
                paddingBottom: 10,
                paddingTop: 10
            }}
            LeftComponent={leftIco ? <View style={{ alignSelf: 'center', paddingLeft: 16 }} >
                <SvgXml xml={leftIco}></SvgXml>
            </View > : undefined}

            onSelectItem={item => {
                if (item) {

                    setSelectedItem(item);
                }
            }}
            dataSet={data}
            onRightIconComponentPress={() => {
                dropdownController.current?.toggle()
            }}
            ItemSeparatorComponent={(
                <View />
            )}
            suggestionsListMaxHeight={Dimensions.get('window').height * 0.3}
            renderItem={(item, text) => (
                <AutoCompleteViewItem item={item} fromBanksForm={fromBanksForm} ico={ico} />
            )}
        />
    );
};



export default AutoCompleteView;