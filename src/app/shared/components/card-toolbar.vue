<template>
    <v-card-actions>
        <v-btn text @click.stop="btn1Data.click(btn1ClickData)" v-if="btn1Data">
            {{ btn1Data.name }}
            <v-icon small right :color="btn1Data.iconColor">{{ btn1Data.icon }}</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text @click="btn2Data.click(btn2ClickData)" v-if="btn2Data">
            {{ btn2Data.name }}
            <v-icon small right :color="btn2Data.iconColor">{{ btn2Data.icon }}</v-icon>
        </v-btn>
    </v-card-actions>
</template>
<script>
export default {
    name: 'CardToolbar',
    props: ["btn1", "btn2", "btn1ClickData", "btn2ClickData"],
    data() {
        return {
            btn1Data: this.btn1,
            btn2Data: this.btn2
        };
    }
};
</script>
