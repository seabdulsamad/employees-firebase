<template>
  <v-layout row wrap>
    <v-flex sm12>
      The application is developed using Nuxt.js, Vuetify & Firebase (Cloud
      Firestore, Authentication, Hosting)
    </v-flex>
    <v-flex sm12>
      <a
        href="https://github.com/seabdulsamad/employees-firebase"
        target="__blank"
      >
        https://github.com/seabdulsamad/employees-firebase
      </a>
    </v-flex>
    <v-flex sm12>
      <v-img src="images/auth.png" :height="450" contain />
    </v-flex>
    <v-flex sm12>
      <v-img src="images/database.png" :height="450" contain />
    </v-flex>
    <v-flex sm12>
      <v-img src="images/media.png" :height="450" contain />
    </v-flex>
    <v-flex sm12>
      <v-img src="images/storage.png" :height="450" contain />
    </v-flex>
  </v-layout>
</template>