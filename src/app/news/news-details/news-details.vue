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
    if (localStorage.getItem('visitedLinks')) {
      try {
        this.visitedLinks = JSON.parse(localStorage.getItem('visitedLinks'));
      } catch (e) {
        localStorage.removeItem('visitedLinks');
      }
    }

    if(this.newsDetails && this.newsDetails.title){
      this.visitedLinks.push({date: new Date().toUTCString(), title: this.newsDetails.title});
    }

    localStorage.setItem('visitedLinks', JSON.stringify(this.visitedLinks));
  }
}
</script>
