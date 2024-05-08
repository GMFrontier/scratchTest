import { useState, useEffect, useRef, useContext } from "react";
import { TouchableOpacity, StyleSheet, View, Animated, Dimensions, } from "react-native";
import PageView, { PagerViewOnPageScrollEventData } from 'react-native-pager-view'
import { SvgXml } from "react-native-svg";
import { CommonActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import SplashScreen from 'react-native-splash-screen'
import { useStatusBar } from "../../core/presentation/contexts/statusBar/StatusBarContext";
import { useTranslation } from "../../core/presentation/contexts/translations/LanguageProvider";
import { ThemeContext } from "../../core/presentation/contexts/theme/ThemeContext";
import { ROUTES } from "../navigation/routes";
import close_ico_black_toast_content from "../../../assets/svg/close_ico_black_toast_content";
import { ButtonPrimary } from "../../core/presentation/components/button/ButtonPrimary";
import OnboardingSlide from "./OnboardingSlide";
import { ButtonLink } from "../../core/presentation/components/button/ButtonLink";
import { ScalingDot } from "react-native-animated-pagination-dots";
import React = require("react");
import { ComponentType } from "../../core/data/enum/ComponentType";
import { ComponentSize } from "../../core/data/enum/ComponentSize";

export const OnBoardingScreen = () => {
  const statusBar = useStatusBar()
  const { translation } = useTranslation();
  const changeStatusBarColor = () => {
    statusBar.setPrimaryStatusBar()
  }
  const navigation = useNavigation();

  const pages = [
    {
      title: translation.file.text_onboarding_1 ?? 'Construye tu crédito\nplanea tu futuro',
      subtitle: 'Obtén tu primera tarjeta e inicia a construir tu historial de crédito con nosotros.',
      image: require('../../../assets/onBoarding_1.png')
    },
    {
      title: translation.file.text_onboarding_2 ?? 'Gestiona tus finanzas sin costos ocultos',
      subtitle: 'Te proporcionamos transparencia total para que tengas un control total sobre tus gastos.',
      image: require('../../../assets/onBoarding_2.png')
    },
    {
      title: translation.file.text_onboarding_3 ?? 'Acompáñanos en tu crecimiento',
      subtitle: 'Mientras compras suma, puntos para canjear por beneficios.',
      image: require('../../../assets/onBoarding_3.png')
    }
  ]

  useFocusEffect(() => {
    changeStatusBarColor()
    SplashScreen.hide();
  })

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const [currentSlideNumber, setSlideNumber] = useState(0)
  const pageRef = useRef<PageView>(null);

  useEffect(() => {
    pageRef.current?.setPage(currentSlideNumber)
  }, [currentSlideNumber]);

  const width = Dimensions.get('window').width;
  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const inputRange = [0, pages.length];
  const scrollX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange,
    outputRange: [0, pages.length * width],
  });
  const onPageScroll = React.useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue,
            },
          },
        ],
        {
          useNativeDriver: false,
        }
      ),
    []
  );

  return (
    <View style={styles.container} >
      <View style={{
        alignItems: "flex-end",
        marginEnd: 16
      }} >
        <ButtonLink
          text="Omitir"
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: ROUTES.Login.LoginScreen.name },
                ],
              })
            )
          }}
        />
      </View>

      <PageView
        ref={pageRef}
        onPageSelected={
          ({ nativeEvent }) => {
            setSlideNumber(nativeEvent.position)
          }}
        style={{ flex: 1 }}
        onPageScroll={onPageScroll}
        initialPage={0}>
        {
          pages.map(({ title, image, subtitle }, index) => (
            <OnboardingSlide
              key={index}
              title={title}
              subtitle={subtitle}
              image={image}
              index={index} />
          ))
        }
      </PageView>

      <ScalingDot
        testID={'scaling-dot'}
        data={pages}
        //@ts-ignore
        scrollX={scrollX}
        activeDotColor={colors.secondary}
        containerStyle={{
          bottom: 130,
        }}
      />

      {currentSlideNumber >= 2 && (<View style={{ zIndex: 1, position: 'absolute', width: '100%', bottom: 30, }}>
        <View style={{ marginHorizontal: 20 }}>
          <ButtonPrimary
            text={translation.file.login ?? 'Iniciar sesión'}
            onPress={() =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    { name: ROUTES.Login.LoginScreen.name },
                  ],
                })
              )
            } />
        </View>
      </View>)}
    </View >
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  }
});