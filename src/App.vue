<script setup>
import { mdiWeatherSunsetDown, mdiWeatherSunsetUp } from '@mdi/js';
import { useTheme } from 'vuetify';
import { ref } from 'vue';

const theme = useTheme();
const actualTheme = ref('');
actualTheme.value = localStorage.getItem('theme') || 'light';

function toggleTheme() {
    actualTheme.value = actualTheme.value === 'light' ? 'dark' : 'light';
    theme.global.name.value = actualTheme.value;
    localStorage.theme = actualTheme.value;
}
</script>

<template>
    <v-app>
        <v-layout class="user-select-hidden">
            <v-app-bar>
                <v-spacer />
                <v-btn
                    class="h-auto w-auto rounded-xl pa-3"
                    @click="toggleTheme"
                >
                    <v-icon
                        v-if="actualTheme === 'dark'"
                        size="40"
                        :icon="mdiWeatherSunsetUp"
                    />
                    <v-icon
                        v-else
                        size="40"
                        :icon="mdiWeatherSunsetDown"
                    />
                </v-btn>
            </v-app-bar>
            <v-main>
                <v-container class="h-100 width-app">
                    <router-view />
                </v-container>
            </v-main>
        </v-layout>
    </v-app>
</template>
