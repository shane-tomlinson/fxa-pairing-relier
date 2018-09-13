<template>
  <div class="home">
    <img class="firefox logo" alt="Firefox logo" src="../assets/firefox-logo.svg">
    <Login/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue';

export default {
  name: 'home',
  components: {
    Login,
  },
};
</script>

<style scoped lang="scss">
.logo {
  height: 100px;
  width: 100px;
}
</style>
