<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      :width="245"
    >
      <v-list shaped class="main-navigation">
        <v-tooltip
          right
          v-for="(item, i) in $pluginsData.mainMenu"
          :key="`main-nav-item-${i}`"
          :disabled="!miniVariant"
        >
          <template v-slot:activator="{ on }">
            <v-list-item v-on="on" :to="item.to" router color="primary">
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
          </template>
          <span>{{ item.title }}</span>
        </v-tooltip>
      </v-list>
      <v-flex class="mini-variant-wrap">
        <v-btn small icon @click.stop="miniVariant = !miniVariant">
          <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
        </v-btn>
      </v-flex>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="primary"
      dark
      :height="50"
    >
      <v-toolbar-title>
        <v-icon :size="30" color="red">mdi-firebase</v-icon>
        {{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="isLoggedIn">{{ user ? user.fullname || user.email : "" }}</div>
      <v-menu :offset-y="true">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-avatar :size="35">
              <v-img src="/images/default.png"></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-list rounded shaped :min-width="225">
          <v-list-item @click="logout">
            <v-list-item-action>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <page-header />
      </v-container>
      <v-container fluid class="pt-0" grid-list-lg>
        <nuxt />
      </v-container>
    </v-main>
    <!-- The right drawer -->
    <v-navigation-drawer
      v-model="rightDrawer"
      right
      temporary
      fixed
      :width="800"
    ></v-navigation-drawer>
    <snackbar />
    <confirm-box />
  </v-app>
</template>
<script>
import { fireDb } from "~/plugins/firebase.js";
import pageHeader from "@/components/pageHeader";
import appEvents from "@/plugins/event";
export default {
  components: { pageHeader },
  data: () => ({
    clipped: true,
    drawer: true,
    fixed: false,
    miniVariant: false,
    right: true,
    rightDrawer: false,
    title: "Employees Firebase",
    users: [],
  }),
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    },
    isLoggedIn() {
      let isLoggedIn = this.$store.getters["auth/loggedIn"];
      if (!isLoggedIn) this.$router.replace({ name: "login" });
      return this.$store.getters["auth/loggedIn"];
    },
  },
  created() {
    // Register the events
    _.map(appEvents, (event) => {
      this.$on(event.name, event.callback);
    });
    window.getApp = this;
  },
  methods: {
    logout() {
      fireAuth.signOut();
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      this.$router.replace({ name: "login" });
    },
  },
  firestore: {
    users: fireDb.collection("users"),
  },
  watch: {
    users() {
      this.$store.dispatch({
        type: "collection/setData",
        key: "users",
        data: _.clone(this.users),
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.main-navigation {
  a:hover {
    text-decoration: none;
  }
}
.mini-variant-wrap {
  position: absolute !important;
  bottom: 10px !important;
  left: 20px !important;
}
</style>
