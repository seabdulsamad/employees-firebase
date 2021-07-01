<template>
  <v-app class="public-app">
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <snackbar />
  </v-app>
</template>
<script>
export default {
  created() {
    window.getApp = this;
  },
};
</script>
<style lang="scss" scoped>
.public-app {
  background-image: url("/bg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>

