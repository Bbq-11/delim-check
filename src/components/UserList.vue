<script setup>
import { mdiAutorenew, mdiPlusCircleOutline } from '@mdi/js';
import { useUserStore } from '../stores/UserStore.js';
import UserListItem from './UserListItem.vue';

const userStore = useUserStore();
</script>

<template>
    <div class="border-b-sm d-flex justify-center py-4 mb-2">
        <v-btn-primary
            class="py-2 px-5"
            :prepend-icon="mdiPlusCircleOutline"
            text="Добавить человека!"
            @click="userStore.addUser()"
        />
    </div>
    <v-card
        class="scroll-container overflow-y-auto mb-1 mr-1"
        height="320px"
        variant="text"
    >
        <v-card-text v-if="userStore.totalCountUsers">
            <UserListItem
                v-for="user in userStore.users"
                :key="user.id"
                :user="user.id"
                v-model.trim="user.username"
            />
        </v-card-text>
        <v-card-text
            v-else
            class="d-flex flex-column justify-center align-center text-center fill-height gr-6"
        >
            <v-icon
                size="80"
                :icon="mdiAutorenew"
            />
            <div class="text-subtitle-1 text-primary">
                <p>Пока что пусто..</p>
                <p>Давайте добавим кого-нибудь!</p>
            </div>
        </v-card-text>
    </v-card>
</template>

<style scoped></style>
