<template>
  <v-container fluid grid-list-lg class="pt-1">
    <v-layout row fill-height>
      <v-flex sm3 v-for="employee in employees" :key="employee.id">
        <v-card class="full-height">
          <v-card-text class="relative">
            <v-menu offset-y left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  class="employee-action-btn"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list dense>
                <v-list-item
                  :to="{
                    name: 'employees-action-id',
                    params: { action: 'modify', id: employee.id },
                  }"
                  class="text-decoration-none"
                >
                  <v-list-item-icon>
                    <v-icon>mdi-circle-edit-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item @click="removeEmployee(employee.id)">
                  <v-list-item-icon>
                    <v-icon>mdi-delete-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Remove</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-layout column justify-center>
              <v-flex align-self-center>
                <v-badge
                  bottom
                  overlap
                  bordered
                  :color="employee.isOnline ? 'green' : 'error'"
                  :offset-x="28"
                  :offset-y="20"
                >
                  <v-avatar :size="90" class="grey lighten-1">
                    <v-img
                      v-if="_.size(employee.images)"
                      :src="employee.images[0]"
                      :lazy-src="employee.images[0]"
                      :aspect-ratio="1.3"
                    />
                    <span v-else class="text-uppercase font-weight-bold">
                      {{ employee.name.charAt(0) + employee.name.charAt(1) }}
                    </span>
                  </v-avatar>
                </v-badge>
              </v-flex>
              <v-flex align-self-center class="font-weight-bold py-0 title">
                {{ _.truncate(employee.name, { length: 20 }) }}
              </v-flex>
              <v-flex align-self-center class="py-0">
                {{ employee.title }}
              </v-flex>
            </v-layout>
            <div class="text-uppercase py-3 grey--text">About</div>
            <div class="pb-3">
              {{ _.truncate(employee.about, { length: 200 }) }}
            </div>

            <div class="text-uppercase py-3 grey--text">
              Personal Information
            </div>
            <div class="pb-2">
              <v-icon :size="20" left>mdi-email-outline</v-icon>
              {{ employee.email }}
            </div>
            <div class="pb-2">
              <v-icon :size="20" left>mdi-phone-outline</v-icon>
              {{ employee.phone }}
            </div>
            <div>
              <v-icon :size="20" left>mdi-clock-outline</v-icon>
              Mon-Fri 09AM-06PM
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    employees: [],
  }),
  created() {
    this.$store.dispatch("pageHeader/setActionItems", [
      {
        name: "Add New Employee",
        to: {
          name: "employees-action-id",
          params: { action: "create", id: "new" },
        },
      },
    ]);
  },
  methods: {
    removeEmployee(id) {
      let that = this;
      window.getApp.confirmBox.config = { show: true };
      // watch the user action reposne
      window.getApp.$once("confirmBox", (confirm) => {
        if (confirm) {
          fireDb
            .collection("employees")
            .doc(id)
            .delete()
            .then((res) => {
              console.log(res);
              window.getApp.snackbar.config = {
                show: true,
                text: that.$pluginsData.messages.remove,
              };
            });
        }
      });
    },
  },
  firestore: {
    employees: fireDb.collection("employees"),
  },
};
</script>
<style scoped>
.employee-action-btn {
  position: absolute;
  right: 15px;
}
</style>