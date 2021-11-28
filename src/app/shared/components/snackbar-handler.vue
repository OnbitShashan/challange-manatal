<template>
    <v-snackbar v-model="showSnackbar" :color="snackbarData.backgroundColor">
        <span :class="snackbarData.textColor">{{ snackbarData.text }}</span>
        <v-btn :color="snackbarData.buttonColor" text @click="toggle(false)">Close</v-btn>
    </v-snackbar>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
    name: "SnackbarHandler",
    computed: {
        ...mapState({
            snackbarData: state => state.news.snackbarData,
        }),
        showSnackbar: {
            get: function () {
                return this.$store.state.news.showSnackbar;
            },
            set: function (show) {
                this.$store.commit('news/setShowSnackbar', show);
            }
        }
    },
    methods: {
        ...mapMutations({
            toggle: 'news/setShowSnackbar'
        })
    }
}
</script>