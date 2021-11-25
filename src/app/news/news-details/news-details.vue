<template>
  <v-container>
    <v-row>
      <v-col class="text-center" cols="12">
        <h1 class="my-5 indigo--text text--darken-2 font-weight-regular">{{ newsDetails.title }}</h1>
        <v-parallax :src="newsDetails.urlToImage"></v-parallax>
      </v-col>
      <v-col cols="12">{{ newsDetails.content }}</v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'NewsDetails',
  props: ["details"],
  data() {
    return {
      newsDetails: this.details
    };
  }
}
</script>
