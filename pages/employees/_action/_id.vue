<template>
  <v-form v-model="productForm" ref="productForm">
    <v-container fluid grid-list-lg class="py-0">
      <v-layout row fill-height>
        <v-flex sm8>
          <v-card class="full-height">
            <v-card-text>
              <v-layout row>
                <v-flex sm6>
                  <v-text-field
                    v-model="params.name"
                    label="Name"
                    clearable
                    :rules="[(v) => !!v || 'The specified field is required']"
                  ></v-text-field>
                </v-flex>
                <v-flex sm6>
                  <v-text-field
                    v-model="params.title"
                    label="Title"
                    clearable
                    :rules="[(v) => !!v || 'The specified field is required']"
                  ></v-text-field>
                </v-flex>
                <v-flex sm6>
                  <v-text-field
                    v-model="params.email"
                    label="Email"
                    clearable
                    :rules="[(v) => !!v || 'The specified field is required']"
                  ></v-text-field>
                </v-flex>
                <v-flex sm6>
                  <v-text-field
                    v-model="params.phone"
                    label="Phone"
                    clearable
                    :rules="[(v) => !!v || 'The specified field is required']"
                  ></v-text-field>
                </v-flex>
                <v-flex sm12>
                  <v-textarea
                    label="About Us"
                    v-model="params.about"
                    clearable
                    auto-grow
                    :rows="3"
                    :rules="[(v) => !!v || 'The specified field is required']"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text class="grey lighten-4">
              <v-layout row>
                <v-flex sm6>
                  <v-file-input
                    label="Choose Image"
                    accept="image/*"
                    show-size
                    hint="After the image upload completion, you must hit on save button."
                    persistent-hint
                    @change="onfileSelectToUpload($event)"
                  ></v-file-input>
                </v-flex>
                <v-flex sm12>
                  <v-progress-linear
                    :active="fileUploading"
                    :background-opacity="0.2"
                    :buffer-value="100"
                    :height="4"
                    rounded
                    top
                    :value="uploader"
                    color="primary"
                  ></v-progress-linear>
                  <v-flex>
                    <v-avatar
                      v-for="(image, index) in params.images"
                      :key="index"
                      :size="100"
                      class="mr-2 mb-2"
                    >
                      <v-btn
                        icon
                        small
                        class="grey lighten-4 custom-clear-btn"
                        @click="removeImage(image, index)"
                      >
                        <v-icon color="red">mdi-close</v-icon>
                      </v-btn>
                      <v-img :src="image" style="z-index: 1"></v-img>
                      <circle-loading class="custom-loading" />
                    </v-avatar>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-divider />
            <v-card-text class="text-right">
              <v-btn
                text
                color="secondary"
                @click="$router.replace({ name: 'employees' })"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                @click="saveEmployee"
                :loading="saveLoading"
              >
                Save &rarr;
              </v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>
<script>
export default {
  data: () => ({
    fileUploading: false,
    uploader: 0,
    isModify: false,
    skuLoading: false,
    saveLoading: false,
    productForm: true,
    datapickerModel: false,
    date: null,
    skuErrors: [],
    colors: [],
    params: {
      name: null,
      title: null,
      email: null,
      phone: null,
      images: null,
    },
  }),
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    },
  },
  created() {
    this.params.createdBy = this.user.uid;
    this.colors = this.$pluginsData.colors;
  },
  methods: {
    removeImage(imagePath, index) {
      let that = this;
      window.getApp.confirmBox.config = { show: true };
      // watch the user action reposne
      window.getApp.$once("confirmBox", (confirm) => {
        if (confirm) {
          let refs = _.first(
            _.split(_.last(_.split(_.replace(imagePath, "%2F", "/"), "/")), "?")
          );
          console.log(refs);
          firebaseApp
            .storage()
            .ref("media")
            .child(refs)
            .delete()
            .then(() => {
              that.params.images.splice(index, 1);
              window.getApp.snackbar.config = {
                show: true,
                text: "The specified image has been removed. Please hit save.",
              };
            })
            .catch(() => {
              that.params.images.splice(index, 1);
            });
        }
      });
    },
    onfileSelectToUpload: function (file) {
      if (!this.params.images) this.params.images = [];
      let that = this;
      if (file) {
        this.fileUploading = true;
        //get file
        let fileNewName = Date.now() + "_" + file.name;
        //set storage ref
        let storageRef = firebaseApp.storage().ref("media").child(fileNewName);
        //upload file
        let task = storageRef.put(file);
        task.on(
          "state_changed",
          function progress(snapshot) {
            let percentage =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            that.uploader = percentage;
          },
          function error(err) {
            console.log(err);
          },
          function complete() {
            that.fileUploading = false;
            console.log("complete upload");
            task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              that.params.images.push(downloadURL);
              console.log("File available at", downloadURL);
            });
          }
        );
      }
    },
    saveEmployee() {
      if (this.$refs.productForm.validate()) {
        this.saveLoading = true;
        if (this.isModify) {
          this.params.lastModifiedOn = moment.now();
          this.params.billingPrice = 0;
        } else {
          this.params.createdOn = moment.now();
        }

        fireDb
          .collection("employees")
          .doc(this.isModify ? this.$route.params.id : uuid())
          .set(this.params)
          .then(() => {
            this.saveLoading = false;
            this.$refs.productForm.reset();
            window.getApp.snackbar.config = {
              show: true,
              text: this.$pluginsData.messages.default_success,
            };
            this.$router.replace({ name: "employees" });
          })
          .catch(() => {
            this.saveLoading = false;
            window.getApp.snackbar.config = {
              show: true,
              text: this.$pluginsData.messages.default_error,
            };
          });
      }
    },
    async fetchProductInfo() {
      await fireDb
        .collection("employees")
        .doc(this.$route.params.id)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            this.params = snapshot.data();
          }
        });
    },
  },
  watch: {
    "$route.params": {
      immediate: true,
      handler() {
        if (this.$route.params.action == "modify") {
          this.isModify = true;
          this.fetchProductInfo();
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-clear-btn {
  position: absolute !important;
  right: 37px !important;
  top: 37px !important;
  z-index: 2 !important;
}
.custom-loading {
  position: absolute !important;
  z-index: 0;
}
</style>