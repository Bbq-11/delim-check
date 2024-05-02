<script setup>
import { ref } from 'vue';
import { mdiAlertCircleOutline } from '@mdi/js';

defineProps({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
    },
});

const isOpen = ref(false);

const switchOpen = () => {
    isOpen.value = !isOpen.value;
    if (!isOpen.value) return;
    setTimeout(() => (isOpen.value = false), 2500);
};
</script>

<template>
    <v-btn-primary
        class="py-4 w-100"
        variant="plain"
        text="Дальше!"
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
                <v-card-text class="text-body-1 text-primary">
                    <p>{{ title }}</p>
                    <p>{{ subtitle }}</p>
                </v-card-text>
            </v-card>
        </v-dialog>
    </template>
</template>
