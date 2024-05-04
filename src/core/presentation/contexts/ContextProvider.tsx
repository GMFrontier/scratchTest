import LoadingStateProvider from './loading/LoadingStateContext';
import { ToastContextProvider } from './messages/ToastContext';
import { ThemeProvider } from './theme/ThemeContext';
import { LanguageProvider } from './translations/LanguageProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBarProvider } from './statusBar/StatusBarContext';
import { KeyboardProvider } from "react-native-keyboard-controller";
import { NewModalContextProvider } from './messages/ModalContext';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

const ContextProvider = ({ children }: any) => {
  return (
    <KeyboardProvider>
      <ThemeProvider>
        <LoadingStateProvider>
          <LanguageProvider>
            <AutocompleteDropdownContextProvider>
              <ToastContextProvider>
                <NewModalContextProvider>
                  <SafeAreaProvider>
                    <StatusBarProvider>
                      {children}
                    </StatusBarProvider>
                  </SafeAreaProvider>
                </NewModalContextProvider>
              </ToastContextProvider>
            </AutocompleteDropdownContextProvider>
          </LanguageProvider>
        </LoadingStateProvider>
      </ThemeProvider>
    </KeyboardProvider>
  );
};

export default ContextProvider;
