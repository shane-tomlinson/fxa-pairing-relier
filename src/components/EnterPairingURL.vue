<template>
  <form @submit="submit">
    <div>
      <label for="url" @change="updatePairingUrl">Enter pairing URL</label>
    </div>
    <div>
      <textarea name="url" :value="pairing_url" />
    </div>
    <div>
      <input type="submit" value="submit">
    </div>
  </form>
</template>

<script>

export default {
  name: 'EnterPairingUrl',

  computed: {
  },

  methods: {
    updatePairingUrl(event) {
      this.$store.commit('pairingUrl', event.target.value);
    },

    submit(event) {
      event.preventDefault();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
textarea {
  height: 200px;
  width: 300px;
}
</style>
