import React, { useState, useRef, useContext } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { ThemeContext } from '../../contexts/theme/ThemeContext';

interface OtpInputProps {
  numberOfInputs?: number;
  onComplete: (otp: string) => void;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  numberOfInputs = 6,
  onComplete,
}) => {

  const [otp, setOtp] = useState<string[]>(Array(numberOfInputs).fill(''));
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const inputRefs = useRef<TextInput[]>([]);
  const { theme: { colors } } = useContext(ThemeContext);


  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    input: {
      width: 49,
      height: 49,
      backgroundColor: '#E9EBEE',
      borderRadius: 12,
      textAlign: 'center',
      color: '#3D444F',
      fontSize: 20,
    },
    filledInput: {
      backgroundColor: '#e8eee0',
      borderColor: colors.primary,
      borderRadius: 12,
      borderWidth: 2,
    },
  });

  const handleInput = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < numberOfInputs - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (newOtp.every((digit) => digit !== '')) {
      onComplete(newOtp.join(''));
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <View key={index}>
          <TextInput
            maxLength={1}
            keyboardType="numeric"
            style={[
              styles.input,
              isFilled && styles.filledInput // Estilo adicional cuando está lleno
            ]}
            onChangeText={(value: string) => handleInput(index, value)}
            onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(index, key)}
            value={digit}
            ref={(ref) => (inputRefs.current[index] = ref)}
          />
        </View>
      ))}
    </View>
  );
};

