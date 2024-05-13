<script setup>
import ProductList from '../components/ProductList.vue';
import { useProductStore } from '../stores/ProductStore.js';
import DialogError from '../components/DialogError.vue';

const productStore = useProductStore();
</script>
<template>
    <v-sheet
        class="rounded-lg mt-12 mb-4"
        elevation="10"
    >
        <ProductList />
    </v-sheet>
    <v-card
        class="rounded-xl text-center mb-6"
        elevation="10"
    >
        <v-card-title class="tex-h5 mb-2"> Промежуточный итог: </v-card-title>
        <v-card-text class="text-h4 mb-1">
            {{ productStore.subtotal }}
        </v-card-text>
    </v-card>
    <div class="mb-10">
        <router-link
            v-if="
                productStore.totalCountProducts &&
                productStore.checkDataTitles &&
                productStore.checkDataPrices &&
                productStore.checkDataUsers
            "
            to="/result"
            class="w-100"
            tabindex="-1"
        >
            <v-btn-primary
                class="py-4 w-100"
                elevation="10"
                text="К результатам!"
            />
        </router-link>
        <DialogError
            v-else-if="!productStore.totalCountProducts"
            title="Добавьте что-нибудь!"
        />
        <DialogError
            v-else-if="!productStore.checkDataTitles"
            title="Назовите все продукты!"
        />
        <DialogError
            v-else-if="!productStore.checkDataPrices"
            title="Введите корректную стоимость для всех продуктов!"
        />
        <DialogError
            v-else
            title="Отметьте пользователей во всех продуктах!"
        />
    </div>
</template>
