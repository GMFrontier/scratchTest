import { useState, useEffect, useContext, useRef } from 'react';
import { View, StyleSheet, Platform, PermissionsAndroid, LogBox, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlaceData, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { ic_close_gray, ic_search } from '../../../../../assets/svg/card_delivery';
import Fonts from '../../../../core/constants/Fonts';
import FontsSize from '../../../../core/constants/FontsSize';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import ToolbarView from '../../../../core/presentation/components/toolbar/ToolbarView';
import { ButtonPrimary } from '../../../../core/presentation/components/button/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import container from '../../../di/inversify.config';
import { TYPES } from '../../../di/types';
import CardsViewModel from '../CardsViewModel';
import { maps_style } from '../maps_style';

export const MapScreen = () => {

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const nav = useNavigation()

  const [address, setAddress] = useState('')
  const [visible, setVisible] = useState(false)
  const [regionCoords, setRegion] = useState({ lat: 37.78825, lng: -122.4324 });
  const [marker, setMarker] = useState({ lat: 37.78825, lng: -122.4324 })
  const ref = useRef<any>();

  const viewModel = container.get<CardsViewModel>(TYPES.CardsViewModel);

  var api = "AIzaSyA1BCWEu8UVo8BW-6SW2BEdkg9_MVKXIpU"

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Geolocation Permission',
              message: 'Can we access your location?',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getLocation();
          } else {
            console.log('You cannot use Geolocation');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
    };
  }, []);

  const clearSearch = () => {
    ref.current?.clear();
  }

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const crd = position.coords;
        setRegion({ lat: crd.latitude, lng: crd.longitude });
        setMarker({ lat: crd.latitude, lng: crd.longitude });
      }
    )
  };

  const onPressSearch = (data: any, details: any) => {
    setVisible(true)
    setAddress(data.description)
    setRegion(details.geometry.location);
    setMarker(details.geometry.location);
  };

  const renderRow = (data: GooglePlaceData, index: number) => {
    return (
      <View style={{ flexDirection: "row", marginTop: 10, paddingHorizontal: 8, backgroundColor: colors.accentSecondary }} >
        <CustomText
          text={data.structured_formatting.main_text + ", "}
          fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._16_SIZE}
        />
        <CustomText
          text={data.structured_formatting.main_text + " " + data.structured_formatting.secondary_text}
          fontFamily={Fonts.DMSansMedium}
          textSize={FontsSize._16_SIZE}
        />
      </View>
    )
  }

  return (
    <ToolbarView
      text={"Dirección de entrega"}>
      <View>
        <View style={{
          zIndex: 1,
          position: 'absolute',
          top: 30,
          height: "auto",
          left: 24,
          right: 24,
          flexDirection: "row",
          alignItems: "center",
        }}>
          <GooglePlacesAutocomplete
            ref={ref}
            placeholder={"Ingresa tu dirección"}
            fetchDetails={true}
            minLength={6}
            debounce={600}
            enablePoweredByContainer={false}
            query={{
              key: api
            }}
            GooglePlacesDetailsQuery={{
              fields: 'geometry',
            }}
            renderRow={renderRow}
            onPress={onPressSearch}
            styles={{
              row: {
                backgroundColor: colors.accentSecondary,
                borderRadius: 8,
              },
              textInput: {
                fontSize: 16,
                backgroundColor: colors.accentSecondary,
                fontFamily: Fonts.DMSansRegular,
                marginTop: 6,
                padding: 0,
                borderWidth: 1,
                borderColor: colors.captionText,
                borderRadius: 8,
                paddingHorizontal: 52,
                paddingVertical: 12,
                height: 56
              },
              listView: {
                borderRadius: 14,
                marginTop: 4,
                backgroundColor: colors.accentSecondary,
              },
              separator: {
                height: 0,
              },
              description: {
                fontFamily: Fonts.DMSansRegular,
                fontSize: FontsSize._16_SIZE,
                marginTop: 10,
              },
            }}
            textInputProps={{
              placeholderTextColor: colors.captionText,
              returnKeyType: "search",
              color: colors.white,
            }}
            onFail={(error) => console.error(error)}
          />
        </View>
        <View style={{
          zIndex: 1,
          position: 'absolute',
          top: 38,
          start: 24,
          paddingHorizontal: 16,
          paddingVertical: 12
        }}>
          <SvgXml xml={ic_search} />
        </View>

        <TouchableOpacity
          style={{
            zIndex: 1,
            position: 'absolute',
            top: 40,
            end: 24,
            paddingHorizontal: 16,
            paddingVertical: 12
          }}
          onPress={clearSearch}
          activeOpacity={.8}>
          <SvgXml xml={ic_close_gray} />

        </TouchableOpacity>

        <MapView style={style.map}
          provider={PROVIDER_GOOGLE}
          minZoomLevel={16}
          customMapStyle={maps_style}
          region={{
            latitude: regionCoords.lat,
            longitude: regionCoords.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={(e) => {
            setMarker({ lat: e.nativeEvent.coordinate.latitude, lng: e.nativeEvent.coordinate.longitude })
          }}>
          <Marker draggable coordinate={{ latitude: marker.lat, longitude: marker.lng }} />
        </MapView>

        {visible && (<View style={[style.bottomContainer]}>
          <ButtonPrimary
            text={"Confirmar dirección"}
            onPress={() => {
              viewModel.setAddress(address)
              nav.goBack()
            }}
          />
        </View>
        )}
      </View>
    </ToolbarView>

  );
};

const style = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 95 : 75,
    left: 24,
    right: 24,
  },
});
