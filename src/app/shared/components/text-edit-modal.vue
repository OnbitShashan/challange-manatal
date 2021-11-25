<template>
    <v-dialog v-model="dialog" persistent width="500">
        <v-card v-if="dialogData">
            <v-card-title class="grey lighten-3">{{ dialogData.title }}</v-card-title>

            <v-col cols="12">
                <v-text-field :label="dialogData.label" required v-model="dialogData.headline"></v-text-field>
            </v-col>
            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="pink lighten-1" text @click="$emit('close', '')">Close</v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="$emit('close', { id: dialogData.id, title: dialogData.headline })"
                >Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: 'TextEditModal',
    props: ["model", "data"],
    data() {
        return {
            dialog: this.model,
            dialogData: this.data
        };
    },
    watch: {
        model(val) {
            this.dialog = val;
        },
    }
};
</script>
