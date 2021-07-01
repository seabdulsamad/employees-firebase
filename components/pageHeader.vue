<template>
  <v-container fluid>
    <v-layout row>
      <v-flex class="pl-2">
        <v-icon left>{{ $store.state.pageHeader.icon }}</v-icon>
        <span
          class="font-weight-medium text-capitalize page-title"
          v-html="pageTitle"
        ></span>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex class="text-md-right">
        <template v-for="(item, index) in actionItems">
          <v-btn
            small
            text
            class="primary text-decoration-none mx-1"
            :key="index"
            v-if="item.action == 'event'"
            :disabled="item.disabled"
            @click="setActionStatus(item)"
            >{{ item.text }} &rarr;</v-btn
          >
          <v-btn
            small
            text
            class="primary text-decoration-none mx-1"
            :to="item.to"
            :key="index"
            v-else
            >{{ item.name }} &rarr;</v-btn
          >
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  computed: {
    actionItems() {
      return this.$store.getters["pageHeader/getActionItems"];
    },
    pageTitle() {
      return this.$route.name == "index"
        ? "About"
        : _.join(
            _.slice(
              _.filter(
                _.split(this.$route.name, "-"),
                (item) => !_.includes(["id"], item)
              ),
              0,
              1
            ),
            " &rsaquo; "
          );
    },
  },
  methods: {
    setActionStatus(action) {
      this.$store.dispatch("pageHeader/setActionStatus", {
        name: action.name,
        active: true,
      });
    },
  },
};
</script>
<style>
.page-title {
  font-size: 1.3em;
}
</style>