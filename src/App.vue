<script setup>
import { mdiWeatherSunsetDown, mdiWeatherSunsetUp } from '@mdi/js';
import { ref } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme();
const dark = ref(false);
function toggleTheme() {
    dark.value = !dark.value;
    theme.global.name.value = dark.value ? 'dark' : 'light';
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
                        v-if="dark"
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
