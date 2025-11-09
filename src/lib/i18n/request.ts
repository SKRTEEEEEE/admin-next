import {getRequestConfig} from 'next-intl/server';
import { routing } from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;
  // console.log("locale in getRequestConfig: ", locale)
  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as "en" | "de" | "es" | "ca")) {
    locale = routing.defaultLocale;
  }
 
  return {
    locale,
    messages: {
      ...(await import(`../../../content/data/${locale}/admin.json`)).default,
      ...(await import(`../../../content/data/${locale}/common.json`)).default,
    }
  };
});