<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/UserStore.js';
import CardsDeb from '../components/CardsDeb.vue';
import CardsCredit from '../components/CardsCredit.vue';
import { useProductStore } from '../stores/ProductStore.js';

const userStore = useUserStore();
const productStore = useProductStore();

const router = useRouter();
const tab = ref('byDebtor');
const handleReset = () => {
    router.push('/');
    userStore.users = [];
    productStore.products = [];
};

onBeforeMount(() => {
    userStore.clearTransactions();
    for (const user of userStore.users) {
        userStore.fillTransactions(user);
    }
});
</script>

<template>
    <v-sheet
        class="mb-6 mt-12 pb-8"
        elevation="10"
        rounded="lg"
    >
        <v-tabs
            v-model="tab"
            class="border-b-sm mb-4"
            align-tabs="center"
            color="primary"
            fixed-tabs
        >
            <v-tab value="1">Кто - кому</v-tab>
            <v-tab value="2">Кому - кто</v-tab>
        </v-tabs>
        <v-window v-model="tab">
            <v-window-item value="1">
                <CardsCredit />
            </v-window-item>
            <v-window-item value="2">
                <CardsDeb />
            </v-window-item>
        </v-window>
    </v-sheet>
    <router-link
        to="/"
        class="w-100"
    >
        <v-btn-primary
            class="py-4 w-100 mb-10"
            elevation="10"
            text="К результатам!"
            @click="handleReset"
        />
    </router-link>
</template>
