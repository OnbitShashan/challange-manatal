<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <div class="d-flex align-center">
        <v-btn class="mr-3" text href="/">
          <v-icon color="white">mdi-home</v-icon>
        </v-btn>
        <h2 class="mr-3">News 24x7</h2>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <overlay-loader></overlay-loader>
    <snackbar-handler></snackbar-handler>

    <v-main>
      <router-view />
      <!-- <HelloWorld/> -->
    </v-main>
  </v-app>
</template>

<script>
import OverlayLoader from "@/app/shared/components/overlay-loader.vue"
import SnackbarHandler from "@/app/shared/components/snackbar-handler.vue"

export default {
  name: "App",
  components: {
    OverlayLoader,
    SnackbarHandler
  }
}
</script>