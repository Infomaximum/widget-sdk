import {
  Localization,
  type ILocalizationProps,
  type TLocalizationDescription,
  type TExtractLocalizationParams,
  ELanguages,
} from "@infomaximum/localization";

export { type TLocalizationDescription } from "@infomaximum/localization";

let localization: Localization | null = null;
const supportedLanguages = [Localization.Language.ru, Localization.Language.en];

export const getLocalizedText = <
  L extends TLocalizationDescription,
  P extends ILocalizationProps = TExtractLocalizationParams<L>,
>(
  language: ELanguages,
  locObj: L,
  props?: P
) => {
  if (!localization || localization.getLanguage() !== language) {
    const isSupportLanguage = supportedLanguages.includes(language);

    !isSupportLanguage &&
      console.error(
        `An unsupported "${language}" language has been passed. The default language is English`
      );

    const lang = isSupportLanguage ? language : Localization.Language.en;

    localization = new Localization({ language: lang });
  }

  return localization.getLocalized<L, P>(locObj, props);
};
