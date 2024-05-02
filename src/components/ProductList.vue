<script setup>
import { mdiAlertCircleOutline, mdiDeleteEmptyOutline, mdiPlusCircleOutline } from '@mdi/js';
import ProductListItem from './ProductListItem.vue';

import { useProductStore } from '../stores/ProductStore.js';
import { useUserStore } from '../stores/UserStore.js';
import { ref } from 'vue';

const productStore = useProductStore();

const userStore = useUserStore();

const isOpen = ref(false);

const switchOpen = () => {
    isOpen.value = !isOpen.value;
    if (!isOpen.value) return;
    setTimeout(() => (isOpen.value = false), 2500);
};
</script>

<template>
    <div class="border-b-sm d-flex justify-center py-4 mb-2">
        <v-btn-primary
            v-if="userStore.totalCountUsers"
            class="py-2 px-5"
            :prepend-icon="mdiPlusCircleOutline"
            text="Добавить позицию!"
            @click="productStore.addProduct()"
        />
        <v-btn-primary
            v-else
            class="py-2 px-5"
            :prepend-icon="mdiPlusCircleOutline"
            text="Добавить позицию!"
            variant="plain"
            :disabled="isOpen"
            @click="switchOpen()"
        />
        <template>
            <v-dialog
                v-model="isOpen"
                width="auto"
            >
                <v-card
                    class="text-center bg-error py-4 px-6 rounded-lg"
                    elevation="12"
                >
                    <div>
                        <v-icon
                            size="80"
                            color="primary"
                            :icon="mdiAlertCircleOutline"
                        />
                    </div>
                    <v-card-text class="text-body-1 text-primary"> Добавьте пользователей! </v-card-text>
                </v-card>
            </v-dialog>
        </template>
    </div>
    <v-card
        class="overflow-y-auto scroll-container mr-1 mb-1"
        :height="600"
        variant="text"
    >
        <v-expansion-panels v-if="productStore.totalCountProducts">
            <ProductListItem
                v-for="product in productStore.products"
                :key="product.id"
                :product="product"
                v-model:title="product.title"
                v-model:price="product.price"
            />
        </v-expansion-panels>
        <v-card-text
            v-else
            class="d-flex flex-column justify-center align-center text-center fill-height"
        >
            <v-icon
                color="primary"
                size="80"
                :icon="mdiDeleteEmptyOutline"
            />
            <div class="text-subtitle-1 text-primary">
                <p>Ваша продуктовая корзина пуста..</p>
            </div>
        </v-card-text>
    </v-card>
</template>

<style scoped></style>
