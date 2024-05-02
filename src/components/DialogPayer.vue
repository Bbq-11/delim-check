<script setup>
import { mdiMapMarkerQuestionOutline, mdiWalletOutline } from '@mdi/js';
import { ref } from 'vue';

import { useProductStore } from '../stores/ProductStore.js';
import { useUserStore } from '../stores/UserStore.js';

const productStore = useProductStore();
const userStore = useUserStore();

const payer = defineModel('payer');

const props = defineProps({
    product: {
        type: Object,
        required: true,
    },
});

const isActive = ref(false);
const switchActive = () => (isActive.value = !isActive.value);
</script>

<template>
    <v-btn
        class="text-subtitle-1 w-100 rounded-xl"
        color="primary"
        :prepend-icon="mdiWalletOutline"
        @click="switchActive"
        :text="props.product.payer.username"
    />
    <template>
        <v-dialog
            v-model="isActive"
            max-width="400px"
        >
            <v-card
                class="text-center bg-error text-primary rounded-lg pa-4"
                elevation="20"
            >
                <div>
                    <v-icon
                        size="100"
                        color="primary"
                        :icon="mdiMapMarkerQuestionOutline"
                    />
                </div>
                <v-card-text class="text-h5 mb-2">
                    <span>Кто оплачивает?</span>
                </v-card-text>
                <v-card-actions>
                    <v-radio-group v-model="payer">
                        <label
                            class="d-flex align-center justify-space-between mb-3"
                            v-for="user in userStore.users"
                            :key="user.id"
                        >
                            <v-container>
                                <v-row
                                    align="center"
                                    no-gutters
                                >
                                    <v-col cols="auto">
                                        <v-avatar
                                            class="text-h5 text-uppercase font-weight-bold text-primary bg-background mr-3"
                                        >
                                            {{ user.username.charAt(0).toUpperCase() }}
                                        </v-avatar>
                                    </v-col>
                                    <v-col
                                        cols="auto"
                                        class="subtitle-1 font-weight-bold text-primary"
                                    >
                                        {{ user.username }}
                                    </v-col>
                                    <v-spacer />
                                    <v-col cols="auto">
                                        <v-radio
                                            :value="user"
                                            @click="switchActive"
                                        >
                                        </v-radio>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </label>
                    </v-radio-group>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </template>
</template>

<style scoped></style>
