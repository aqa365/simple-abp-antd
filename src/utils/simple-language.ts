import Cookies from 'js-cookie';
export default {
  getCurrentLanguage() {
    return Cookies.get(API_ACCEPT_LANGUAGE_KEY) || 'en';
  },
  setLanguage(cultureName: string) {
    Cookies.set(API_ACCEPT_LANGUAGE_KEY, cultureName);
  },
  convertToAntdLanguage(cultureName: string) {
    switch (cultureName) {
      case 'zh-Hans':
        return 'zh-CN';
      case 'zh-Hant':
        return 'zh-TW';
      case 'en':
      default:
        return 'en-US';
    }
  },
  convertToBraftEditorLanguage() {
    var language = this.getCurrentLanguage();
    switch (language) {
      case 'zh-Hans':
        return 'zh';
      case 'zh-Hant':
        return 'zh-hant';
      case 'en':
      default:
        return 'en';
    }
  },
};
