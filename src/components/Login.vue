<template>
  <div>
    <a v-if="loginUrl" :href="loginUrl">Login to Fenix</a>
    <EnterPairingURL v-if="!loginUrl" />
  </div>
</template>

<script>
import { OAuthUtils } from 'fxa-crypto-relier/src/relier';
import querystring from 'querystring';
import EnterPairingURL from '@/components/EnterPairingURL.vue';

const REDIRECT_URI = `${window.location.origin}/oauth/code`;
const SCOPES = ['profile', 'https://identity.mozilla.com/apps/oldsync'];
const CLIENT_ID = 'abf993ed3419f034';
const FXA_BASE_URL = 'http://127.0.0.1:3030/pair/supp';
const OAUTH_SERVER = 'http://127.0.0.1:9010';

export default {
  name: 'Login',

  components: {
    EnterPairingURL,
  },

  data() {
    return {
      loginUrl: undefined,
    };
  },

  created() {
    const hashParams = querystring.parse(window.location.hash.replace('#', ''));
    console.log('hashParams', hashParams);

    if (!Object.keys(hashParams).length) {
      return;
    }

    const oauthUtils = new OAuthUtils({
      oauthServer: OAUTH_SERVER,
    });

    oauthUtils.getKeyFlowParams(CLIENT_ID, {
      redirectUri: REDIRECT_URI,
      scopes: SCOPES,
    }).then(({ codeVerifier, params: pkceParams }) => {
      this.loginUrl = `${FXA_BASE_URL}?${querystring.stringify(pkceParams)}#${querystring.stringify(hashParams)}`;

      oauthUtils.persistKeyStore();
      console.log('pkce', pkceParams);
      this.$store.commit('codeVerifier', codeVerifier);
      this.$store.commit('OAuthState', pkceParams.state);
      this.$store.commit('keysJwk', pkceParams.keys_jwk);
    });
  },


};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
