<template>
  <!-- The specified component is used for the confirm box as well as the shared dialog box -->
  <v-dialog v-model="config.show" :max-width="config.width || 420" persistent>
    <v-card>
      <v-card-title class="headline">{{ config.headling ? config.headling : "Confirm Remove?" }}</v-card-title>
      <v-card-text>{{ config.text || "Are you sure you want to remove the specified information. You'll not be able to undo that operation."}}</v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn
          color="secondary"
          text
          @click="config.show = false"
        >{{ config.closebtnText || 'Cancel' }}</v-btn>
        <v-btn color="primary" @click="onConfirm" :hidden="config.hideConfirm">Proceed &rarr;</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data: () => ({
    config: {
      show: false,
      headling: null,
      text: null,
      hideConfirm: false,
      closebtnText: "Cancel"
    }
  }),
  created() {
    window.getApp.confirmBox = this;
  },
  methods: {
    onConfirm() {
      window.getApp.$emit("confirmBox", true);
      this.config.show = false;
    }
  }
};
</script>