import ReactNativeBiometrics from "react-native-biometrics";
import { useToastContext } from "../../contexts/messages/useToastContext";
import BiometricViewModel from "./BiometricViewModel";
import { TYPES } from "../../../../scratch/di/types";
import container from "../../../../scratch/di/inversify.config";

//TODO mejorar traducciones
export function useBiometrics() {

  const viewModel = container.get<BiometricViewModel>(TYPES.BiometricViewModel);
  const showInfoToast = useToastContext().showInfoToast
  const rnBiometrics = new ReactNativeBiometrics();

  async function biometricPrompt(title: string, errorText: string, onBiometricSuccess: () => void) {
    try {
      const resultObject = await rnBiometrics.simplePrompt({
        promptMessage: title,
      });
      const { success, error } = resultObject;
      const hasBiometricBeenSet = await viewModel.hasBiometricBeenSet();
      if (success && hasBiometricBeenSet) {
        onBiometricSuccess();
      } else if (error === "User cancellation") {
        //en caso de cancelacion no hacer nada
      } else {
        showInfoToast(errorText);
      }
    } catch (_) { }
  };

  async function isBiometricAvailable(onBiometricsAvailable: () => void, onBiometricsUnavailable: () => void) {
    rnBiometrics.isSensorAvailable()
      .then((resultObject) => {
        if (resultObject.available) {
          onBiometricsAvailable()
        } else {
          onBiometricsUnavailable()
        }
      })
      .catch((error) => {
        onBiometricsUnavailable()
      })
  }

  function saveUserBiometrics(title: string, onSuccessText: string) {
    rnBiometrics.isSensorAvailable()
      .then(async (resultObject) => {
        const { available } = resultObject
        if (available) {
          const isBiometricAvailable = await viewModel.hasBiometricBeenSet()
          if (!isBiometricAvailable) {
            rnBiometrics.simplePrompt({ promptMessage: title })
              .then((resultObject) => {
                const { success, error } = resultObject
                if (success) {
                  viewModel.setBiometricAccount()
                  showInfoToast(onSuccessText)
                } else {
                  console.log(error)
                }
              })
              .catch((error) => {
                console.log(error)
              })
          }
        }
      })
  };
  return {
    biometricPrompt,
    isBiometricAvailable,
    saveUserBiometrics,
  };
}