import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    oauth_client_id: 'abf993ed3419f034',
    oauth_code_verifier: undefined,
    oauth_keys_jwk: undefined,
    oauth_result: undefined,
    oauth_server: 'http://127.0.0.1:9010',
    oauth_state: undefined,
    pairing_url: '',
  },
  mutations: {
    /* eslint-disable no-param-reassign */
    initializeStore(state) {
      const storedData = localStorage.getItem('store');

      console.log('initializing with', storedData);
      if (storedData) {
        this.replaceState(Object.assign(state, JSON.parse(storedData)));
      }
    },

    codeVerifier(state, codeVerifier) {
      state.oauth_code_verifier = codeVerifier;
    },

    keysJwk(state, keysJwk) {
      state.oauth_keys_jwk = keysJwk;
    },

    OAuthState(state, oauthState) {
      state.oauth_state = oauthState;
    },

    pairingUrl(state, pairingUrl) {
      state.pairing_url = pairingUrl;
    },
    /* eslint-enable no-param-reassign */
  },
  actions: {

  },
});

store.subscribe((mutation, state) => {
  console.log('storing data', state);
  localStorage.setItem('store', JSON.stringify(state));
});

export default store;
