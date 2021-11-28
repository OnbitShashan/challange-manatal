<template>
    <v-dialog v-model="filterDialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                class="mb-3 mb-sm-0 mr-2"
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
                @click="onSelectSource(source)"
                :color="selectedSource.name === source.name ? 'pink lighten-3' : ''"
            >{{ source.name }}</v-chip>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'NewsFilterBySources',
    data: function () {
        return {
            filterDialog: false,
        };
    },
    computed: mapState({
        sources: state => state.news.sources,
        selectedSource: state => state.news.headlineFilterSources
    }),
    created: function () {
        this.$store.dispatch('news/getSources');
    },
    methods: {
        onSelectSource(source) {
            this.$store.commit('news/setHeadlineFilterSources', source);
            this.$store.dispatch('news/getNewsTopHeadlines');
            this.filterDialog = false;
        }
    }
}
</script>