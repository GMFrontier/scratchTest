import { createContext, useContext, useState } from 'react';
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
  setTranslation: () => { },
});

export const LanguageProvider = ({ children }: any) => {
  const [translation, setTranslation] = useState<Translations>({
    lang: '',
    version: "0",
    file: {
      title_onboarding_1: "Construye tu crédito\nplanea tu futuro",
      subtitle_onboarding_1: "Obtén tu primera tarjeta e inicia a construir tu historial de crédito con nosotros.",
      title_onboarding_2: "Gestiona tus finanzas sin costos ocultos",
      subtitle_onboarding_2: "Te proporcionamos transparencia total para que tengas un control total sobre tus gastos.",
      title_onboarding_3: "Acompáñanos en tu crecimiento",
      subtitle_onboarding_3: "Mientras compras suma, puntos para canjear por beneficios",
      access: "Acceder",
      login: "Iniciar sesión",
      login_welcome: "Te damos la bienvenida",
      email: "Correo electrónico",
      email_placeholder: "correo.user@mail.com",
      remember_email: "Recordar correo de acceso",
      continue: "Continuar",
      dont_have_account_yet: "¿No tienes cuenta?",
      register_here: "Regístrate aqui",
      bottom_tab_home: "Home",
      bottom_tab_cards: "Tarjetas",
      bottom_tab_points: "Puntos",
      bottom_tab_settings: "Ajustes",
      next: "Siguiente",
      june: "Junio",
    },
  });

  return (
    <LanguageContext.Provider value={{ setTranslation, translation }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
