

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';
import { CustomText } from '../text/CustomText';
import { ButtonPrimary } from '../button/ButtonPrimary';
import Sizebox from '../item/Sizebox';
import { ButtonSecondary } from '../button/ButtonSecondary';
import ic_close_outline from '../../../../../assets/svg/ic_close_outline';

interface Props {
  title: string;
  subtitle: string;
  labelButtonPrimary?: string
  icoModal: any
  actionButtonPrimary: () => void;
  labelButtonSecondary?: string
  actionButtonSecondary: () => void;
  showIconClose?: boolean,
  actionCloseModal?: () => void;
  content: any
}

export const ModalContent = ({ title, subtitle, labelButtonPrimary, icoModal, actionButtonPrimary, labelButtonSecondary, actionButtonSecondary, showIconClose = false, actionCloseModal, content }: Props) => {

  const style = StyleSheet.create({
    contentBottomSheetContainer: {
      paddingHorizontal: 24
    }
  });

  return (
    <View style={style.contentBottomSheetContainer}>
      {showIconClose ?
        <TouchableOpacity onPress={actionCloseModal} style={{ position: 'absolute', right: 0, top: 0, zIndex: 1, padding: 32, paddingRight: 16 }}>
          <SvgXml xml={ic_close_outline} />
        </TouchableOpacity>
        :
        null
      }
      {content && <View>
        {content(actionCloseModal)}
      </View>
      }
      {!content && <View>
        <Sizebox height={34}></Sizebox>

        {icoModal &&
          <View style={{ alignItems: 'center', marginTop: 24 }}>
            <SvgXml xml={icoModal}></SvgXml>
          </View>
        }

        <Sizebox height={24}></Sizebox>

        <CustomText
          textAlign='center'
          fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._24_SIZE}
          text={title} />

        <Sizebox height={8}></Sizebox>

        <CustomText
          textSize={FontsSize._16_SIZE}
          textAlign='center'
          text={subtitle} />


        {
          labelButtonPrimary ?
            <View>
              <Sizebox height={36}></Sizebox>

              <ButtonPrimary
                text={labelButtonPrimary}
                onPress={actionButtonPrimary}
                position='relative' />
            </View>
            : null
        }

        <Sizebox height={16}></Sizebox>

        {
          labelButtonSecondary ?
            <ButtonPrimary
              buttonType="secondary"
              text={labelButtonSecondary}
              onPress={actionButtonSecondary}
              position='relative' />
            : null
        }
      </View>
      }


      <Sizebox height={18}></Sizebox>


    </View>
  );
};
