import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Fonts from '../../../constants/Fonts';
import { SvgXml } from 'react-native-svg';
import { CustomText } from '../text/CustomText';
import FontsSize from '../../../constants/FontsSize';
import bell_ico_content from '../../../../../assets/svg/xml/bell_ico_content';
import arrow_ico_black_content from '../../../../../assets/svg/xml/arrow_ico_black_content';
import { User, UserVerifiedStatus } from '../../../../paguelo_facil/domain/entities/User';
import { getSimpleName } from '../../../../paguelo_facil/domain/entities/FastActionsResponseModel';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { UserAvatar } from '../image/UserAvatar';
import { useTranslation } from '../../contexts/translations/LanguageProvider';
import NavigationService from '../../../../paguelo_facil/presentation/navigator/NavigatorService';
import { ROUTES } from '../../../../scratch/presentation/navigation/routes';
import ic_exclamation_circle_small from '../../../../../assets/svg/xml/ic_exclamation_circle_small';


interface Props {
  onPress: () => void;
  user?: User
}


const UserInfoHeader = ({ onPress, user }: Props) => {
  const { translation } = useTranslation();

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const screenWidth = Dimensions.get('window').width;



  return (
    <View style={style.cardContainer}>

      <TouchableOpacity onPress={onPress}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <UserAvatar
            uri={user?.photo}
            name={getSimpleName(user?.name + ' ' + user?.lastname)}
            width={48}
            height={48}
            stroke={2}
            backgroundColor={colors.green07}
            strokeColor={colors.green07}
          />
          {user?.verifiedStatus !== UserVerifiedStatus.VALIDATED &&
            <View style={{ position: "absolute", marginStart: 32 }}>
              <SvgXml xml={ic_exclamation_circle_small} />
            </View>
          }
        </View>
      </TouchableOpacity>

      <View style={{ alignSelf: 'center', marginStart: 8 }}>

        <TouchableOpacity onPress={
          () => {
            onPress();

          }
        }>
          <View style={{ alignContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
            <CustomText
              text={translation.file.my_profile}
              underline={true}
              textSize={FontsSize._14_SIZE}
              textColor={colors.textColor04}
              fontFamily={Fonts.PoppinsMedium}
            />
            <SvgXml xml={arrow_ico_black_content}></SvgXml>
          </View>
        </TouchableOpacity>

        <View style={{ alignSelf: 'center', width: screenWidth * 0.5 }}>


          <CustomText
            text={user?.name + " " + user?.lastname}
            textSize={FontsSize._16_SIZE}
            numberOfLines={1}
            marginTop={4}
            fontFamily={Fonts.PoppinsMedium}
          />
        </View>

      </View>
      <TouchableOpacity style={{ position: 'absolute', right: 0, alignSelf: 'center', marginEnd: 24 }}
        onPress={() => {
          NavigationService.navigate(ROUTES.Home.NotificationsScreen.name)
        }
        }>
        <SvgXml xml={bell_ico_content}></SvgXml>
      </TouchableOpacity>

    </View>
  );
};

const style = StyleSheet.create({

  cardContainer: {
    alignContent: 'center',
    paddingStart: 24,
    paddingBottom: 26,
    paddingTop: 26,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 10,
    shadowOpacity: 0.1,
    zIndex: 1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  }
});

export default UserInfoHeader;