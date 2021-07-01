<template>
  <v-container fluid>
    <v-form v-model="valid" ref="loginForm" class="login-form">
      <v-flex sm12 class="text-center pb-10">
        <v-icon :size="80" color="red" left>mdi-firebase</v-icon>
      </v-flex>
      <v-layout align-center justify-center>
        <v-card class="elevation-4 login-wrap">
          <v-card-text>
            <v-flex>
              <v-text-field
                v-model="params.username"
                type="email"
                label="Username"
                outlined
                hide-details
                class="mb-3"
                :rules="[(v) => !!v || 'The specified field is required']"
                @keyup.enter="onLogin"
                dense
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="params.password"
                :type="isPasswordType ? 'password' : 'text'"
                label="Password"
                outlined
                hide-details
                class="mb-3"
                :rules="[(v) => !!v || 'The specified field is required']"
                @keyup.enter="onLogin"
                dense
              >
                <template slot="append">
                  <v-icon
                    class="pointer"
                    @click="isPasswordType = !isPasswordType"
                    >{{
                      isPasswordType ? "mdi-eye-outline" : "mdi-eye-off-outline"
                    }}</v-icon
                  >
                </template>
              </v-text-field>
            </v-flex>
            <v-flex>
              <v-btn
                color="primary"
                block
                :height="45"
                @click="onLogin"
                :loading="loading"
                :disabled="!valid"
                >Login</v-btn
              >
            </v-flex>
            <v-flex></v-flex>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-form>
  </v-container>
</template>
<script>
export default {
  layout: "public-no-app-bar",
  data: () => ({
    valid: true,
    loading: false,
    isPasswordType: true,
    params: {
      username: "se.abdulsamad@gmail.com",
      password: "Admin@123",
    },
  }),
  methods: {
    onLogin() {
      if (this.$refs.loginForm.validate()) {
        this.loading = true;
        this.$store
          .dispatch("auth/retrieveToken", this.params)
          .then(() => {
            this.$router.replace("/");
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    onSignup() {
      if (this.$refs.loginForm.validate()) {
        this.loading = true;
        fireAuth
          .createUserWithEmailAndPassword(
            this.params.username,
            this.params.password
          )
          .then(() => {
            this.loading = false;
            this.$router.replace("/");
          })
          .catch((error) => {
            this.loading = false;
            window.getApp.snackbar.config = {
              show: true,
              text: error.message || this.$pluginsData.messages.default_success,
            };
          });
      }
    },
  },
};
</script>
<style scoped>
.login-form {
  margin-top: 20vh;
}
.login-wrap {
  width: 350px;
}
</style>
