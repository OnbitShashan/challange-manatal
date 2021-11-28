<template>
    <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>

<script>
export default {
    name: "OverlayLoader",

    data: function () {
        return {
            overlay: false
        };
    },
    created: function () {
        this.$root.$on('overlay-loader', (value) => {
            this.overlay = value;
        });
    }
}
</script>