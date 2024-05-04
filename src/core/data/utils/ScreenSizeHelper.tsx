
import { Dimensions } from 'react-native';

export function calculatePercentHeight(percentSize: number): number {
  const windowHeight = Dimensions.get('window').height;
  const percent = (percentSize / 100) * windowHeight;

  return percent;
}