import React, {createContext, useContext, useEffect, useState} from 'react';
import { Translations } from './Translations';

interface LanguageContextType {
  translation: Translations;
  setTranslation: (translation: Translations) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  translation: {
    lang: '',
    version: "0",
    file: {},
  },
  setTranslation: () => {},
});

export const LanguageProvider = ({children}: any) => {
  const [translation, setTranslation] = useState<Translations>({
    lang: '',
    version: "0",
    file: {},
  });

  return (
    <LanguageContext.Provider value={{setTranslation, translation}}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
