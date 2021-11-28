<template>
    <v-snackbar v-model="snackbar" color="red darken-4">
        {{ text }}
        <v-btn color="white" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
</template>

<script>
export default {
    name: "ErrorHandler",
    data: function () {
        return {
            snackbar: false,
            text: ''
        };
    },
    created: function () {
        this.$root.$on('show-error', (value) => {
            this.text = value;
            this.snackbar = true;
        });
    }
}
</script>