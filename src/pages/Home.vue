<script setup></script>

<template>
    <v-container class="fill-height">
        <v-card
            class="w-100 text-center rounded-xl pa-6 ma-0"
            elevation="10"
        >
            <v-card-item class="mb-6">
                <v-card-title class="text-primary mb-2">
                    <span class="text-h2 font-weight-bold">Чекдели</span>
                </v-card-title>
                <v-card-subtitle class="text-primary">
                    <span class="text-subtitle-1 font-weight-bold">Делить чеки - просто!</span>
                </v-card-subtitle>
            </v-card-item>
            <v-card-actions class="justify-center">
                <router-link to="/usernames">
                    <v-btn-primary
                        class="py-4 px-6"
                        text="Начать"
                    />
                </router-link>
            </v-card-actions>
        </v-card>
    </v-container>
</template>
