import { useState, useEffect, useRef, useContext } from "react";
import { StyleSheet, View, Animated, Dimensions, } from "react-native";
import PageView, { PagerViewOnPageScrollEventData } from 'react-native-pager-view'
import { CommonActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import SplashScreen from 'react-native-splash-screen'
import { useStatusBar } from "../../core/presentation/contexts/statusBar/StatusBarContext";
import { useTranslation } from "../../core/presentation/contexts/translations/LanguageProvider";
import { ThemeContext } from "../../core/presentation/contexts/theme/ThemeContext";
import { ROUTES } from "../navigation/routes";
import { ButtonPrimary } from "../../core/presentation/components/button/ButtonPrimary";
import OnboardingSlide from "./OnboardingSlide";
import { ButtonLink } from "../../core/presentation/components/button/ButtonLink";
import { ScalingDot } from "react-native-animated-pagination-dots";
import React = require("react");
import onboarding_1 from "../../../assets/svg/onboarding_1";
import onboarding_2 from "../../../assets/svg/onboarding_2";
import onboarding_3 from "../../../assets/svg/onboarding_3";

export const OnBoardingScreen = () => {
  const statusBar = useStatusBar()
  const { translation } = useTranslation();
  const changeStatusBarColor = () => {
    statusBar.setPrimaryStatusBar()
  }
  const navigation = useNavigation();

  const pages = [
    {
      title: translation.file.title_onboarding_1,
      subtitle: translation.file.subtitle_onboarding_1,
      image: onboarding_1
    },
    {
      title: translation.file.title_onboarding_2,
      subtitle: translation.file.subtitle_onboarding_2,
      image: onboarding_2
    },
    {
      title: translation.file.title_onboarding_3,
      subtitle: translation.file.subtitle_onboarding_3,
      image: onboarding_3
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
                  { name: ROUTES.Auth.LoginScreen.name },
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
        inActiveDotColor={colors.disableText}
        containerStyle={{
          bottom: 160,
        }}
        activeDotScale={1}
      />

      {currentSlideNumber >= 2 &&
        <ButtonPrimary
          text={translation.file.access}
          marginHorizontal={16}
          onPress={() =>
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: ROUTES.Auth.LoginScreen.name },
                ],
              })
            )
          } />}
    </View >
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  }
});