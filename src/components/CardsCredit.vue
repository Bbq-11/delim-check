<script setup>
import { useUserStore } from '../stores/UserStore.js';
import { onMounted } from 'vue';

import { mdiThumbUpOutline } from '@mdi/js';

const userStore = useUserStore();
onMounted(() => {
    for (const user of userStore.users) {
        userStore.fillCreditors(user);
    }
});
</script>

<template>
    <v-card
        class="text-center text-primary d-flex flex-column mx-auto justify-space-around align-center mb-0"
        variant="text"
        max-width="600"
        v-for="user in userStore.users"
        :key="user.id"
        :user="user"
        :transactions="user.transactions"
    >
        <v-card-title class="text-h5 font-weight-bold mb-2"> Пользователь {{ user.username }} должен </v-card-title>
        <v-card-text class="text-subtitle-1 text-center border-b-sm w-100">
            <div
                v-if="user.creditors.size"
                v-for="creditor in user.creditors"
            >
                {{ creditor.join(' - ') }}
            </div>
            <div v-else>
                <v-icon
                    class="mb-2"
                    :icon="mdiThumbUpOutline"
                    size="40"
                />
                <p>А никому он ничего не должен. Живет как хочет!</p>
            </div>
        </v-card-text>
    </v-card>
</template>

<style scoped></style>
