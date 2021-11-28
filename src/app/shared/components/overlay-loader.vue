<template>
    <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "OverlayLoader",

    computed: mapState({
        overlay: state => state.news.isOverlayLoading,
    })
}
</script>