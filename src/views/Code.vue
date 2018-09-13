<template>
  <div>
    <section v-if="!result">
      <h1>Fetching keys</h1>
      <div v-if="!!error" class="error">{{error}}</div>

      <div>code: {{ code }}</div>
      <div>state: {{ state }}</div>
    </section>

    <section v-if="!!kA">
      <h1>Sync keys</h1>
      <div>
        <h2>kA</h2>
        <div>{{ kA }}</div>
        <h2>kB</h2>
        <div>{{ kB }}</div>
      </div>
    </section>
    <section v-if="result && ! kA">
      <h1>Result</h1>
      <div>{{ result }}</div>
    </section>
  </div>
</template>

<script>

import { OAuthUtils } from 'fxa-crypto-relier/src/relier';
import querystring from 'querystring';

const OAUTH_SERVER = 'http://127.0.0.1:9010/v1';
const CLIENT_ID = 'abf993ed3419f034';

export default {
  name: 'OAuthCode',

  data() {
    return {
      code: undefined,
      error: undefined,
      kA: undefined,
      kB: undefined,
      result: undefined,
      state: undefined,
    };
  },

  created() {
    const queryParams = querystring.parse(window.location.search.replace('?', ''));
    console.log('queryParams', queryParams);

    const oauthUtils = new OAuthUtils({
      oauthServer: OAUTH_SERVER,
    });

    const { code, state } = queryParams;
    this.code = code;
    this.state = state;
    console.log('store state', this.$store.state);
    const codeVerifier = this.$store.state.oauth_code_verifier;

    oauthUtils.loadKeyStore()
      .then(() => oauthUtils.tradeCodeForKeys(CLIENT_ID, code, codeVerifier))
      .then((result = {}) => {
        this.result = result;

        if (result.keys) {
          this.kA = result.keys.kA;
          this.kB = result.keys.kB;
        }
      })
      .catch((err) => {
        this.error = String(err);
      });
  },
};

</script>

<style>
.error {
  display: inline-block;
  background-color: red;
  color: white;
  padding: 5px 10px;
}
</style>
