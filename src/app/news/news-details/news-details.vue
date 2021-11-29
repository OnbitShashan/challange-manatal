<template>
  <v-container>
    <v-row v-if="newsDetails">
      <v-col class="text-center" cols="12">
        <h1 class="my-5 indigo--text text--darken-2 font-weight-regular">{{ newsDetails.title }}</h1>
        <v-img
          :aspect-ratio="16 / 9"
          width="100%"
          v-if="newsDetails.urlToImage"
          :src="newsDetails.urlToImage"
        ></v-img>
      </v-col>
      <v-col cols="12">
        <div class="text-overline">Author: {{ newsDetails.author }}</div>
        <div class="text-caption font-italic">Published at: {{ formatTimeToUTCString(newsDetails.publishedAt) }}</div>
        <blockquote class="blockquote font-weight-bold">{{ newsDetails.description }}</blockquote>
        <p>{{ newsDetails.content }}</p>
      </v-col>
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
    // MANAGE NEWS_DETAILS
    if (!this.details && appLocalStorage.getItem('lastViewdHeadline')) {
      try {
        this.newsDetails = appLocalStorage.getItem('lastViewdHeadline');
      } catch (e) {
        appLocalStorage.removeItem('lastViewdHeadline');
      }
    }

    if (this.details) {
      appLocalStorage.setItem('lastViewdHeadline', this.details);
    }

    // GET AND SET VISITED TITLES
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
  },
  methods: {
    formatTimeToUTCString: function (time) {
      return new Date(time).toUTCString();
    }
  }
}
</script>
