<template>
  <v-container>
    <v-row v-if="newsDetails">
      <v-col class="text-center" cols="12">
        <h1 class="my-5 indigo--text text--darken-2 font-weight-regular">{{ newsDetails.title }}</h1>
        <v-parallax v-if="newsDetails.urlToImage" :src="newsDetails.urlToImage"></v-parallax>
      </v-col>
      <v-col cols="12">{{ newsDetails.content }}</v-col>
    </v-row>
  </v-container>
</template>

<script>
import { appLocalStorage } from '@/app/shared/services/';

export default {
  name: 'NewsDetails',
  props: ["details"],
  data: function () {
    return {
      newsDetails: this.details,
      visitedLinks: []
    };
  },
  mounted: function () {
    if (appLocalStorage.getItem('visitedLinks')) {
      try {
        this.visitedLinks = appLocalStorage.getItem('visitedLinks');
      } catch (e) {
        appLocalStorage.removeItem('visitedLinks');
      }
    }

    if (this.newsDetails && this.newsDetails.title) {
      this.visitedLinks.push({ date: new Date().toUTCString(), title: this.newsDetails.title });
      appLocalStorage.setItem('visitedLinks', this.visitedLinks);
    }

  }
}
</script>
