import Cookies from 'js-cookie';
import OidcClient from 'oidc-client';

const UserManager = new OidcClient.UserManager(OIDC_CONFIG);

export default {
  userManager: UserManager,

  getAccessToken() {
    return Cookies.get(API_TOKEN_KEY);
  },

  isIdentity() {
    const token = this.getAccessToken();
    return token || false;
  },

  setAccessToken(token: string) {
    Cookies.set(API_TOKEN_KEY, token);
  },

  removeToken() {
    return Cookies.remove(API_TOKEN_KEY);
  },
};
