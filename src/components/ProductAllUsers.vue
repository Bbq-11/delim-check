<script setup>
import { mdiAllInclusive, mdiCheckAll } from '@mdi/js';
import { useUserStore } from '../stores/UserStore.js';

const userStore = useUserStore();

const props = defineProps({
    product: {
        type: Object,
        id: Number,
        title: String,
        price: Number,
        payer: Object,
        users: Array,
    },
});
const checkCountUsers = (product) => product.users.length === userStore.totalCountUsers;
</script>

<template>
    <v-col cols="auto">
        <v-card class="d-flex flex-column justify-center align-center border-sm rounded-lg pa-2 ma-0">
            <v-avatar
                v-if="checkCountUsers(props.product)"
                class="text-h5 text-uppercase text-primary bg-surface"
                :icon="mdiCheckAll"
            />
            <v-avatar
                v-else
                class="text-h5 text-uppercase text-primary bg-background"
                :icon="mdiAllInclusive"
            />
            <v-card-text class="pa-0 mt-2"> Все </v-card-text>
        </v-card>
    </v-col>
</template>
