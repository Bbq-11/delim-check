<script setup>
import { useUserStore } from '../stores/UserStore.js';
import { onMounted } from 'vue';

const userStore = useUserStore();
onMounted(() => {
    for (const user of userStore.users) {
        userStore.fillDebtors(user);
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
        <div
            class="mt-2 border-b-sm text-center"
            v-if="user.debtors.size"
        >
            <v-card-title class="text-h5 font-weight-bold mb-2"> Пользователю {{ user.username }} должны </v-card-title>
            <v-card-text class="text-subtitle-1">
                <div
                    class="mb-1"
                    v-if="user.debtors.size"
                    v-for="debtor in user.debtors"
                >
                    {{ debtor.join(' - ') }}
                </div>
            </v-card-text>
        </div>
    </v-card>
</template>

<style scoped></style>
