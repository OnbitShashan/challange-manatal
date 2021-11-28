<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex align-center flex-wrap">
        <v-text-field
          id="search"
          class="mr-2"
          label="Search for a Headline"
          v-model="searchText"
          @click:clear="searchText = ''; getNewsTopHeadlines()"
          clearable
          v-debounce:500="getNewsTopHeadlines"
        ></v-text-field>
        <filter-sources-modal :selected="selectedSource" @filter="filterBySource"></filter-sources-modal>
        <v-btn class="mb-3 mb-sm-0" color="grey lighten-5" light @click="reset()">Reset</v-btn>
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
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.4), rgba(0,0,0,.8)"
            height="250px"
            type="button"
            @click="readMore(headline)"
          >
            <v-card-title class="text-break" v-text="headline.title"></v-card-title>
          </v-img>

          <card-toolbar
            :btn1="btn1"
            :btn1ClickData="{ 'text': headline.title, 'index': index }"
            :btn2="btn2"
            :btn2ClickData="headline"
          ></card-toolbar>
        </v-card>
      </v-col>
    </v-row>

    <v-btn class="mt-7" color="red darken-1" dark @click="makeWrongApiCall()">Make a wrong api call</v-btn>

    <visited-history-modal :view-history-dialog="history" @close="historyDialogClose"></visited-history-modal>
    <text-edit-modal
      :model="titleDialog"
      :data="titleDialogData"
      @close="titleDialogClose"
      :count="titleDialogData.count"
      :rules="titleDialogData.rules"
    ></text-edit-modal>
  </v-container>
</template>

<script>
// @ is an alias to /src
import CardToolbar from "@/app/shared/components/card-toolbar.vue"
import TextEditModal from "@/app/shared/components/text-edit-modal.vue"
import VisitedHistoryModal from "@/app/news/shared/components/visited-history.vue"
import FilterSourcesModal from "@/app/news/shared/components/filter-by-sources.vue"
import { fetchNewsTopHeadlines, fetchErrorResult } from '../shared/services';

export default {
  name: 'NewsHeadlines',
  components: {
    CardToolbar,
    TextEditModal,
    VisitedHistoryModal,
    FilterSourcesModal
  },
  data: function () {
    return {
      titleDialog: false,
      filterDialog: false,
      history: false,
      searchText: '',
      selectedSource: {},
      btn1: {
        click: this.editTitle,
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
        text: '',
        index: null,
        count: 150,
        rules: [
          value => !!value || 'Required.',
          value => (value || '').length <= this.titleDialogData.count || `Max ${this.titleDialogData.count} characters`,
        ],
      },
      headlines: [],
      sources: [],
    };
  },
  created: function () {
    this.getNewsTopHeadlines();
  },
  methods: {
    readMore(details) {
      this.$router.push({ name: 'NewsDetails', params: { details: details } });
    },

    editTitle(data) {
      this.titleDialogData.text = data.text;
      this.titleDialogData.index = data.index;
      this.titleDialog = true;
    },

    titleDialogClose(data) {
      this.titleDialog = false;
      if (data) {
        this.headlines[data.index].title = data.text;
      }
    },

    historyDialogClose() {
      this.history = false;
    },

    async getNewsTopHeadlines() {
      this.$root.$emit('overlay-loader', true)
      let params;
      if (this.selectedSource && this.selectedSource.id) {
        params = { sources: this.selectedSource.id, q: this.searchText }
      } else if (this.searchText !== '') {
        params = { q: this.searchText }
      } else {
        params = { country: 'us' }
      }

      try {
        const topHeadlinesRes = await fetchNewsTopHeadlines(params);
        this.headlines = [...topHeadlinesRes.articles];
        console.log(this.headlines)
      } catch (e) {
        console.error(`getNewsTopHeadlines: ${e}`)
        this.$root.$emit('show-error', 'An error occured. Please contact administratior!');
      } finally {
        this.$root.$emit('overlay-loader', false);
      }
    },

    async filterBySource(source) {
      this.filterDialog = false;
      this.selectedSource = source;
      this.getNewsTopHeadlines();
    },

    reset() {
      this.searchText = '';
      this.selectedSource = '';
      this.getNewsTopHeadlines();
    },

    async makeWrongApiCall() {
      this.$root.$emit('overlay-loader', true);
      try {
        const response = await fetchErrorResult();
        console.log(response)
      } catch (e) {
        console.error(`makeWrongApiCall: ${e}`)
        this.$root.$emit('show-error', 'An error occured. Please contact administratior!');
      } finally {
        this.$root.$emit('overlay-loader', false);
      }
    }
  },
}
</script>
