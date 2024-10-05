import { useContext, useEffect } from 'react';
import { View } from 'react-native';
import FontsSize from '../../../../core/constants/FontsSize';
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import Fonts from '../../../../core/constants/Fonts';
import { ButtonPrimary } from '../../../../core/presentation/components/button/ButtonPrimary';
import { useNewModalContext } from '../../../../core/presentation/contexts/messages/useNewModalContext';
import container from '../../../di/inversify.config';
import HomeViewModel from '../HomeViewModel';
import { TYPES } from '../../../di/types';
import { toMoneyFormat } from '../../../../core/data/utils/Utils';

interface Props {
}

export const ExpirationPaymentCard = ({
}: Props) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const showModal = useNewModalContext().showStateModal

  const viewModel = container.get<HomeViewModel>(
    TYPES.HomeViewModel,
  );

  const month = viewModel.periods[0]?.month ?? 0
  const date = new Date()
  date.setMonth(month - 1)
  const stringMonth = date.toLocaleDateString(undefined, { month: "long" }).charAt(0).toUpperCase() + date.toLocaleDateString(undefined, { month: "long" }).slice(1)

  return (
    <View
      style={{ overflow: "hidden", flex: 1 }} >
      <CustomText
        marginTop={18}
        text='Mis próximos vencimientos'
        textSize={FontsSize._16_SIZE}
        fontFamily={Fonts.DMSansMedium} />
      <View
        style={{
          backgroundColor: colors.accentSecondary,
          borderRadius: 8,
          padding: 16,
          marginTop: 8,
          flex: 1
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}>
          <View>
            <CustomText
              text={stringMonth + ' ' + viewModel.periods[0]?.year}
              textSize={FontsSize._16_SIZE}
              fontFamily={Fonts.DMSansMedium} />
            <CustomText
              textColor={colors.white}
              marginTop={4}
              text={'Vencimiento: ' + date.toLocaleDateString()}
              textSize={FontsSize._12_SIZE} />
          </View>
          <ButtonPrimary
            onPress={() => { }}
            position='relative'
            size="small"
            text='Pagar resumen' />
        </View>
        <View style={{ height: 1, backgroundColor: colors.white, marginTop: 12 }} />
        <View
          style={{
            marginEnd: 8,
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 19
          }}>
          <CustomText
            text='Total a pagar:'
            textSize={FontsSize._20_SIZE}
            fontFamily={Fonts.DMSansMedium} />
          <CustomText
            text={toMoneyFormat(viewModel.periods[0]?.amountPay ?? 0)}
            textSize={FontsSize._16_SIZE}
            fontFamily={Fonts.DMSansMedium} />

        </View>
      </View>
    </View>
  )
};
