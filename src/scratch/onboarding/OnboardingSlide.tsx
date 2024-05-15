import { Image, StyleSheet, View } from "react-native";
import { CustomText } from "../../core/presentation/components/text/CustomText";
import FontsSize from "../../core/constants/FontsSize";
import Fonts from "../../core/constants/Fonts";
import { ThemeContext } from "../../core/presentation/contexts/theme/ThemeContext";
import { useContext } from "react";


interface Props {
  title: string;
  subtitle: string;
  image: any;
  index: number;
}

const OnboardingSlide = ({ title, image, subtitle }: Props) => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  return (
    <View style={{ paddingHorizontal: 16 }} >
      <Image resizeMode="stretch" style={styles.imgStyle} source={image} />
      <View style={{ zIndex: 1, marginTop: 20 }} >
        <CustomText text={title} textColor={colors.secondary} fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._32_SIZE} />
      </View>
      <CustomText
        text={subtitle}
        marginTop={16}
        textColor={colors.secondaryText}
        fontFamily={Fonts.DMSansRegular}
        textSize={FontsSize._16_SIZE} />
    </View>
  )
}

export default OnboardingSlide

const styles = StyleSheet.create({
  imgStyle: {
    height: '0%',
    width: '0%'
  }
});