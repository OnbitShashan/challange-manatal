<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <div class="d-flex align-center">
        <v-btn class="mr-3" text href="/">
          <v-icon color="white">mdi-home</v-icon>
        </v-btn>
        <h2>News</h2>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
      <!-- <HelloWorld/> -->
    </v-main>
  </v-app>
</template>
