import {useContext} from 'react';
import {LoadingStateContext} from './LoadingStateContext';

export const useLoadingContext = () => {
  const {isLoading, setLoading} = useContext(LoadingStateContext);

  const withLoadingState = async (callback: () => any) => {
    try {
      setLoading(true);
      const result = await callback();
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return {isLoading, withLoadingState};
};
