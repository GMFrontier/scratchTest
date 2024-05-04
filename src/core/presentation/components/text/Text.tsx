import {StyleProp, TextStyle} from 'react-native/types';
import {useContext} from 'react';
import {Text as PaperText} from 'react-native-paper';
import {ThemeContext} from '../../contexts/theme/ThemeContext';

interface Props {
  text: string;
  textSize?: number;
  style?: StyleProp<TextStyle>;
}

export const Text = ({text, textSize, style}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return (
    <PaperText style={style || {fontSize: textSize || 14, color: colors.text}}>
      {text}
    </PaperText>
  );
};
