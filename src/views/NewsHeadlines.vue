<template>
  <v-container>
    <h1 class="mb-3 indigo--text text--lighten-1 font-weight-light">Headlines</h1>
    <v-row class="text-center">
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card>
          <v-img
            :src="'https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F619bc3ad4e8a0f5ca49de1ea%2F0x0.jpg'"
            class="white--text"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title
              class="text-break"
              v-text="'Rivian Vs. Tesla When They Crossed $100 Billion Valuations'"
            ></v-card-title>
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text href="/details">
              Read Now
              <v-icon color="green darken-2">mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'NewsHeadlines',
  components: {
    // HelloWorld
  }
}
</script>
