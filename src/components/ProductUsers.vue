<script setup>
import { mdiCheck } from '@mdi/js';
import { useProductStore } from '../stores/ProductStore.js';

const productStore = useProductStore();

const props = defineProps({
    product: {
        type: Object,
        id: Number,
        title: String,
        price: Number,
        payer: Object,
        users: Array,
    },
    user: {
        type: Object,
        id: Number,
        username: String,
    },
});
</script>

<template>
    <v-col cols="auto">
        <v-card class="d-flex flex-column justify-center align-center border-sm rounded-lg pa-2 ma-0">
            <v-avatar
                v-if="productStore.checkUser(props.product.id, props.user.id)"
                class="text-h5 text-uppercase text-primary bg-surface"
                :icon="mdiCheck"
            />
            <v-avatar
                v-else
                class="text-h5 text-uppercase font-weight-bold text-primary bg-background"
            >
                {{ props.user?.username.charAt(0).toUpperCase() }}
            </v-avatar>
            <v-card-text class="pa-0 mt-2">
                {{ props.user.username }}
            </v-card-text>
        </v-card>
    </v-col>
</template>

<style scoped></style>
