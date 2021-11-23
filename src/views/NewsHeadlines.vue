<template>
  <v-container>

    <v-row>
      <v-col cols="12" class="d-flex align-center justify-center">
        <v-text-field label="Search for a Headline" v-model="searchText" clearable></v-text-field>
        <v-btn color="blue lighten-1" text >Search</v-btn>
      </v-col>
    </v-row>
    <h4 class="mb-2 indigo--text text--lighten-3 font-weight-light" @click.stop="history = true">View Visted History</h4>
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

          <toolbar :btn1="btn1" :btn2="btn2"></toolbar>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="history" width="80vw">
      <v-card>
        <v-card-title class="grey lighten-3">History</v-card-title>
        <div class="pa-2">Visited headline</div>
        <div class="pa-2">Visited headline</div>
        <div class="pa-2">Visited headline</div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="pink lighten-1" text @click="history = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <edit-title-dialog :model="titleDialog" :data="titleDialogData" @close="titleDialogClose"></edit-title-dialog>
  </v-container>
</template>

<script>
// @ is an alias to /src
import toolbar from "@/components/Toolbar.vue"
import editTitleDialog from "@/components/TextEdit.vue"

export default {
  name: 'NewsHeadlines',
  components: {
    toolbar,
    editTitleDialog
  },
  data() {
    return {
      titleDialog: false,
      history: false,
      searchText: '',
      btn1: {
        click: () => this.titleDialog = true,
        name: 'Edit Title',
        icon: 'mdi-pencil',
        iconColor: 'grey darken-2'
      },
      btn2: {
        click: this.readMore,
        name: 'Read More',
        icon: 'mdi-arrow-right-thick',
        iconColor: 'green darken-2'
      },
      titleDialogData: {
        title: 'Edit Headline',
        label: 'New title',
        headline: 'long text',
        id: 1
      }
    };
  },
  methods: {
    readMore(details) {
      this.$router.push({ name: 'NewsDetails', params: { details: details } });
    },
    titleDialogClose(event) {
      console.log(event)
      this.titleDialog = false;
    }
  },
}
</script>
