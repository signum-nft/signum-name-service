export interface LanguageType {
  locale: string;
  label: string;
}
export const getAvailableLanguages = (): LanguageType[] => [
  { locale: "en", label: "English" },
  { locale: "de", label: "Deutsch" },
  { locale: "pt", label: "Português" },
  { locale: "es", label: "Español" },
  { locale: "ru", label: "Русский" },
  { locale: "uk", label: "український" },
];
