<template>
    <v-dialog v-model="history" width="80vw" @click:outside="$emit('close', '')">
        <v-card>
            <v-card-title class="grey lighten-3">History</v-card-title>
            <v-card-text>
                <template v-if="visitedLinks.length > 0">
                    <div class="pa-2 " v-for="(link, index) in visitedLinks" :key="index">
                        <div class="text-caption grey--text text--darken-4 font-weight-bold">{{ link.date }}</div>
                        <div class="grey--text text--darken-3">{{ link.title }}</div>
                    </div>
                </template>
                <div v-else>
                    <h3 class="pt-4">No history available!</h3>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="pink lighten-1" text @click="$emit('close', '')">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { appLocalStorage } from '@/app/shared/services/';

export default {
    name: 'NewsVisitedHistory',
    props: ["view-history-dialog"],
    data: function () {
        return {
            history: false,
            visitedLinks: []
        };
    },
    created: async function () {
        if (appLocalStorage.getItem('visitedLinks')) {
            try {
                this.visitedLinks = appLocalStorage.getItem('visitedLinks');
            } catch (e) {
                console.error(e)
                appLocalStorage.removeItem('visitedLinks');
            }
        }
    },
    watch: {
        viewHistoryDialog: function (val) {
            this.history = val;
        }
    }
}
</script>