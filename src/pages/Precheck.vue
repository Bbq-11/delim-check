<script setup>
import ProductList from '../components/ProductList.vue';
import DialogError from '../components/DialogError.vue';
import { useProductStore } from '../stores/ProductStore.js';

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
        >
            <v-btn-primary
                class="py-4 w-100"
                elevation="10"
                text="К результатам!"
            />
        </router-link>
        <DialogError
            class="w-100"
            v-else-if="!productStore.totalCountProducts"
            title="Добавьте что-нибудь!"
        />
        <DialogError
            class="w-100"
            v-else-if="!productStore.checkDataTitles"
            title="Назовите все продукты!"
        />
        <DialogError
            class="w-100"
            v-else-if="!productStore.checkDataPrices"
            title="Введите стоимость для всех продуктов!"
        />
        <DialogError
            class="w-100"
            v-else
            title="Отметьте пользователей во всех продуктах!"
        />
    </div>
</template>
