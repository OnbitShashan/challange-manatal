<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex align-center justify-center flex-wrap">
        <v-text-field
          id="search"
          class="mr-sm-2 mr-0"
          label="Search for a Headline"
          v-model="searchText"
          clearable
          v-debounce:500="filterByText"
        ></v-text-field>
        <v-dialog v-model="filterDialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mb-3 mb-sm-0"
              color="blue lighten-1"
              dark
              v-bind="attrs"
              v-on="on"
            >Filter by Source</v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5 blue--text lighten-1">Select Source</v-card-title>
            <v-divider></v-divider>
            <v-chip
              class="ma-1"
              filter
              v-for="(source) in sources"
              :key="source.id"
              @click="filterBySource(source)"
              :color="selectedSource.name === source.name ? 'pink lighten-3' : ''"
            >{{ source.name }}</v-chip>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <h4
      type="button"
      class="mb-2 indigo--text text--lighten-3 font-weight-light"
      @click.stop="history = true"
    >View Visted History</h4>
    <h1
      class="my-5 indigo--text text--lighten-1 font-weight-light"
    >Top Headlines {{ selectedSource.name ? `from ${selectedSource.name}` : '' }}</h1>

    <v-row class="text-center">
      <v-col cols="12" md="6" v-for="(headline,index) in headlines" :key="index">
        <v-card>
          <v-img
            :src="headline.urlToImage"
            class="white--text"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title class="text-break" v-text="headline.title"></v-card-title>
          </v-img>

          <card-toolbar :btn1="btn1" :btn2="btn2" :btn2ClickData="headline"></card-toolbar>
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

    <text-edit-modal :model="titleDialog" :data="titleDialogData" @close="titleDialogClose"></text-edit-modal>
  </v-container>
</template>

<script>
// @ is an alias to /src
import CardToolbar from "@/app/shared/components/card-toolbar.vue"
import TextEditModal from "@/app/shared/components/text-edit-modal.vue"
import axios from 'axios';
import { fetchNewsTopHeadlines } from '../shared/services';

export default {
  name: 'NewsHeadlines',
  components: {
    CardToolbar,
    TextEditModal
  },
  data() {
    return {
      titleDialog: false,
      filterDialog: false,
      history: false,
      searchText: '',
      selectedSource: {},
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
      },
      headlines: [],
      sources: [],
    };
  },
  async created() {
    const [topHeadlinesRes] = await Promise.allSettled([fetchNewsTopHeadlines({ country: 'us' })]);
    console.log(topHeadlinesRes)
    this.headlines = [...topHeadlinesRes.value.articles];
    console.log(this.headlines)
  },
  async mounted() {
    // await this.getTopHeadlines();
    await this.getSources();
  },
  methods: {
    readMore(details) {
      this.$router.push({ name: 'NewsDetails', params: { details: details } });
    },

    titleDialogClose() {
      this.titleDialog = false;
    },

    // async getTopHeadlines() {
    //   try {
    //     const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=967789d09772458ebeecc462172800aa');
    //     if (response.data.status === 'ok') {
    //       this.headlines = [...response.data.articles];
    //       console.log(response)
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },

    async getSources() {
      try {
        const response = await axios.get(' https://newsapi.org/v2/sources?country=us&apiKey=967789d09772458ebeecc462172800aa');
        if (response.data.status === 'ok') {
          this.sources = [...response.data.sources];
          console.log(this.sources)
        }
      } catch (error) {
        console.error(error);
      }
    },

    async getHeadlineBySearchText() {
      try {
        const response = await axios.get(' https://newsapi.org/v2/sources?apiKey=967789d09772458ebeecc462172800aa');
        if (response.data.status === 'ok') {
          this.sources = [...response.data.articles];
          console.log(this.sources)
        }
      } catch (error) {
        console.error(error);
      }
    },

    async filterBySource(source) {
      this.filterDialog = false;
      this.selectedSource = source;
      const filteredHeadlinesRes = await fetchNewsTopHeadlines({ sources: source.id, q: this.searchText });
      console.log(filteredHeadlinesRes)
      this.headlines = [...filteredHeadlinesRes.articles];
    },

    async filterByText() {
      const filteredHeadlinesRes = await fetchNewsTopHeadlines({ sources: this.selectedSource.id, q: this.searchText });
      console.log(filteredHeadlinesRes)
      this.headlines = [...filteredHeadlinesRes.articles];
    }
  },
}
</script>
