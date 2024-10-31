<script setup>
import { useUserStore } from '../stores/UserStore.js';

const userStore = useUserStore();
const modelValue = defineModel();
const props = defineProps({
    user: {
        type: Number,
        required: true,
    },
});
</script>

<template>
    <v-container>
        <v-row class="align-center">
            <v-col cols="auto">
                <v-avatar class="text-h5 text-uppercase font-weight-bold text-primary bg-background">
                    {{ modelValue.charAt(0) }}
                </v-avatar>
            </v-col>
            <v-col>
                <v-text-field
                    v-model="modelValue"
                    autocomplete="off"
                />
            </v-col>
            <v-col cols="auto"> </v-col>
        </v-row>
    </v-container>
</template>
