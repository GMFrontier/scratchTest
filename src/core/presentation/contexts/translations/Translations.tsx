export interface Translations {
  lang: string;
  version: string;
  file: {
    [key: string]: string;
  };
}

export const TRANSLATIONS = 'translations';
export const TRANSLATIONS_ES = 'translations_es';
export const TRANSLATIONS_EN = 'translations_en';
