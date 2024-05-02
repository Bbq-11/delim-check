<script setup>
// import { computed, ref } from 'vue';
import { mdiContentCopy, mdiDeleteOutline } from '@mdi/js';

import { useProductStore } from '../stores/ProductStore.js';
import { useUserStore } from '../stores/UserStore.js';
import DialogPayer from './DialogPayer.vue';
import ProductUsers from './ProductUsers.vue';
import ProductAllUsers from './ProductAllUsers.vue';

const productStore = useProductStore();
const userStore = useUserStore();

const title = defineModel('title');
const price = defineModel('price');

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

const rules = {
    num: (value) => {
        const pattern = /^[1-9]\d*$/;
        return pattern.test(value);
    },
};
</script>

<template>
    <v-expansion-panel>
        <v-expansion-panel-title>
            <v-row
                class="gc-8 mr-4"
                no-gutters
            >
                <v-col>
                    <v-text-field
                        label="Название"
                        v-model.trim="title"
                    />
                </v-col>
                <v-col>
                    <v-text-field
                        label="Цена"
                        type="number"
                        v-model.trim="price"
                        :rules="[rules.num]"
                    />
                </v-col>
            </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <v-row
                class="mb-4 gc-4"
                no-gutters
            >
                <v-col cols="6">
                    <DialogPayer
                        :product="props.product"
                        v-model:payer="props.product.payer"
                    />
                </v-col>
                <v-col>
                    <v-btn
                        class="w-100 border-sm rounded-xl"
                        @click="productStore.copyProduct(props.product.id)"
                    >
                        <v-icon :icon="mdiContentCopy" />
                    </v-btn>
                </v-col>
                <v-col>
                    <v-btn
                        class="w-100 rounded-xl"
                        color="error"
                        @click="productStore.removeProduct(props.product.id)"
                    >
                        <v-icon :icon="mdiDeleteOutline" />
                    </v-btn>
                </v-col>
            </v-row>
            <v-row
                class="py-2 gc-3 flex-nowrap overflow-x-auto scroll-container w-100"
                no-gutters
            >
                <ProductAllUsers
                    :product="props.product"
                    @click="productStore.addAllUserProduct(props.product.id)"
                />
                <ProductUsers
                    v-for="user in userStore.users"
                    :key="user.id"
                    :product="props.product"
                    :user="user"
                    @click="productStore.addUserProduct(props.product.id, user.id)"
                />
            </v-row>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>
