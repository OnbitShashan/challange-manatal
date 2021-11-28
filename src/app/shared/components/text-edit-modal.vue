<template>
    <v-dialog v-model="dialog" persistent width="500">
        <v-card v-if="dialogData">
            <v-card-title class="grey lighten-3">{{ dialogData.title }}</v-card-title>
            <v-form v-model="valid">
                <v-col cols="12">
                    <v-text-field
                        :rules="fieldRules"
                        :counter="fieldCharacterCount"
                        :autofocus="true"
                        :label="dialogData.label"
                        v-model="dialogData.text"
                    ></v-text-field>
                </v-col>
                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="pink lighten-1" text @click="$emit('close', null)">cancel</v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        :disabled="!valid"
                        @click="$emit('close', { index: dialogData.index, text: dialogData.text })"
                    >Save</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: 'TextEditModal',
    props: ["model", "data", "count", "rules"],
    data: function () {
        return {
            dialog: this.model,
            dialogData: this.data,
            fieldCharacterCount: this.count || 20,
            fieldRules: this.rules || [],
            valid: false
        };
    },
    watch: {
        model(val) {
            this.dialog = val;
        },
    }
};
</script>
