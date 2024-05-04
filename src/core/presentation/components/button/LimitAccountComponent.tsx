import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import { CustomText } from '../text/CustomText';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';
import Sizebox from '../item/Sizebox';
import { RowTextComponent } from '../text/RowTextComponent';
import ProgressIndicator from '../progress/ProgressIndicator';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { Limit } from '../../../../paguelo_facil/domain/entities/AccountLimitResponseModel';
import { User } from '../../../../paguelo_facil/domain/entities/User';
import { UserServicesTypeEnum } from '../../../../paguelo_facil/domain/enum/UserServicesTypeEnum';
import { toMoneyFormat } from '../../../../paguelo_facil/presentation/utils/Utils';
import { useTranslation } from '../../contexts/translations/LanguageProvider';

interface Props {
  data?: Limit,
  user?: User
}

export const LimitAccountComponent = ({ data, user }: Props) => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const [buttonDaily, setButtonDaily] = useState(true);

  const currentDate = new Date();

  const currentMonth = currentDate.getMonth() + 1;

  const currentDay = currentDate.getDate();

  const { translation } = useTranslation();



  var service = user?.walletServices.find((ws) => ws.idUsrService == data?.id);

  console.log("SERVICES ID: " + data?.id)
  console.log("SERVICES NAME: " + service?.name)

  var servicesName = ""

  if (service?.name == UserServicesTypeEnum.CHARGE) {
    servicesName = (translation.file.collection ?? "Cobro")
  }
  else if (service?.name == UserServicesTypeEnum.SEND) {
    servicesName = translation.file.Payments ?? "Pagos"
  }
  else if (service?.name == UserServicesTypeEnum.RECHARGE) {
    servicesName = (translation.file.recharge ?? "Recarga")
  } else {
    servicesName = "Otros"
  }


  var monthlyUse = 0;
  var dailyUse = 0;


  var monthlyData = data?.monthlyLimits.find(ml => ml.month === currentMonth)

  if (monthlyData) {
    monthlyUse = monthlyData.monthlyProcessed

    var dailyLimits = monthlyData.dailyLimits.find(dl => dl.day == currentDay)

    if (dailyLimits) {

      dailyUse = dailyLimits.dailyProcessed
    }

  }

  const calculatePercentageMonthly = (monthlyUse / (data?.monthlyLimit ?? 1)) * 100;
  const calculatePercentageDaily = (dailyUse / (data?.dailyLimit ?? 1)) * 100;


  var monthlyUseRemaining: number = ((data?.monthlyLimit ?? 0.0) - monthlyUse);
  var dailyUseRemaining: number = ((data?.dailyLimit ?? 0) - dailyUse);


  return (

    <View style={{ marginBottom: 10 }} key={data?.id}>
      <CustomText text={(translation.file.max_of ?? "Max. de") + " " + servicesName} fontFamily={Fonts.PoppinsRegular} textSize={FontsSize._14_SIZE}  ></CustomText>
      <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8 }}>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          <TouchableOpacity onPress={() => { setButtonDaily(true) }} style={{ ...style.buttonDaily, backgroundColor: buttonDaily ? colors.secondaryBlue03 : colors.background01primary }}>

            <CustomText text={translation.file.diary ?? 'Diario'} fontFamily={Fonts.PoppinsMedium} textColor={buttonDaily ? colors.textColor01 : colors.textColor04}></CustomText>

          </TouchableOpacity>

          <TouchableOpacity onPress={() => { setButtonDaily(false) }} style={{ ...style.buttonMonthly, backgroundColor: buttonDaily ? colors.background01primary : colors.secondaryBlue03 }}>
            <CustomText fontFamily={Fonts.PoppinsMedium} text={translation.file.monthly ?? 'Mensual'} textColor={!buttonDaily ? colors.textColor01 : colors.textColor04}></CustomText>

          </TouchableOpacity>
        </View>

        <Sizebox height={16}></Sizebox>

        <RowTextComponent textstart={translation.file.available_limit ?? 'Límite disponible:'} textEnd={buttonDaily ? ("$" + toMoneyFormat(data?.dailyLimit)) : ("$" + toMoneyFormat(data?.monthlyLimit))}></RowTextComponent>
        <Sizebox height={4}></Sizebox>
        <ProgressIndicator percentage={buttonDaily ? calculatePercentageDaily : calculatePercentageMonthly} colorBar={(calculatePercentageDaily || calculatePercentageMonthly) > 60 ? colors.secondaryOrange06 : undefined}></ProgressIndicator>

        <CustomText marginTop={4} fontFamily={Fonts.PoppinsRegular} textSize={FontsSize._10_SIZE} text={(translation.file.account_footer_label ?? 'Te quedan $ @Remaining para realizar @Servicesname desde tu wallet PF').replace('@Remaining', (buttonDaily ? dailyUseRemaining : monthlyUseRemaining).toString()).replace('@Servicesname', servicesName.toLowerCase())}></CustomText>

      </View>

    </View>
  );
};

const style = StyleSheet.create({
  buttonDaily: {
    justifyContent: 'center',
    alignItems: 'center',

    height: 30,
    flex: 1, borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8
  }, buttonMonthly: {
    justifyContent: 'center',
    alignItems: 'center',

    height: 30,
    flex: 1,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8
  }
});
