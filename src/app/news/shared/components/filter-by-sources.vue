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
                @click="selectSource(source)"
                :color="selectedSource.name === source.name ? 'pink lighten-3' : ''"
            >{{ source.name }}</v-chip>
        </v-card>
    </v-dialog>
</template>

<script>
import { fetchAllSources } from '@/app/news/shared/services';

export default {
    name: 'NewsFilterBySources',
    props: ["selected"],
    data: function () {
        return {
            filterDialog: false,
            sources: [],
            selectedSource: this.selected
        };
    },
    created: function () {
        this.getSources();
    },
    methods: {
        async getSources() {
            try {
                const response = await fetchAllSources();
                if (response.status === 'ok') {
                    this.sources = [...response.sources];
                }
            } catch (e) {
                console.error(`getSources: ${e}`)
                this.$root.$emit('show-error', 'An error occured. Please contact administratior!');
            }
        },

        selectSource (source){
            this.$emit('filter', source); 
            this.selectedSource = source; 
            this.filterDialog = false;
        }
    },
    watch: {
        selected: function(val){
            this.selectedSource = val;
        }
    }
}
</script>