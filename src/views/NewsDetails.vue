<template>
  <v-container>
    
    <v-row>
      <v-col class="text-center" cols="12">
        <h1 class="my-5 indigo--text text--darken-2 font-weight-regular">Rivian Vs. Tesla When They Crossed $100 Billion Valuations</h1>
        <v-parallax src="https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F619bc3ad4e8a0f5ca49de1ea%2F0x0.jpg"></v-parallax>
      </v-col>
      <v-col cols="12">
          Rivian R1T\r\nRivian\r\nRivian is an electric car company that went public on November 10. After pricing its shares at $78 they hit an intra-day high of $179.47 on November 16 and closed at $128.60 on Fr
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'NewsDetails',
  props: ["details"],
  data() {
    return {
      
    };
  },
  created() {
    console.log(this.details);
  },
}
</script>
