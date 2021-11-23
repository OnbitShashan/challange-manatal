<template>
    <v-card-actions>
        <v-btn class="pr-2 mr-1" text @click.stop="btn1Data.click" v-if="btn1Data">
            {{ btn1Data.name }}
            <v-icon class="ml-2" small :color="btn1Data.iconColor">{{ btn1Data.icon }}</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text @click="btn2Data.click" v-if="btn2Data">
            {{ btn2Data.name }}
            <v-icon class="ml-2" small :color="btn2Data.iconColor">{{ btn2Data.icon }}</v-icon>
        </v-btn>
    </v-card-actions>
</template>
<script>
export default {
    name: 'Toolbar',
    props: ["btn1", "btn2"],
    data() {
        return {
            btn1Data: this.btn1,
            btn2Data: this.btn2
        };
    },
    mounted() {
    },
    methods: {

    },
};
</script>
