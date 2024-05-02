import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import colors from 'vuetify/util/colors';
import { VBtn } from 'vuetify/components';

export default createVuetify({
    aliases: {
        VBtnPrimary: VBtn,
    },
    defaults: {
        VBtnPrimary: {
            class: ['text-primary', 'bg-background', 'h-auto', 'border-sm', 'rounded-xl'],
        },
        VTextField: {
            variant: 'outlined',
            hideDetails: 'auto',
            color: 'primary',
            density: 'compact',
            autocomplete: 'off',
            class: ['text-subtitle-1', 'text-primary'],
        },
    },
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                dark: false,
                colors: {
                    background: colors.lightGreen.lighten4,
                    surface: colors.lightGreen.lighten5,
                    surfaceVariant: colors.lightGreen.lighten3,
                    primary: '#263b26',
                    secondary: '#1a281a',
                    // accent
                    //
                    error: colors.orange.lighten2,
                },
            },
            dark: {
                dark: true,
                colors: {
                    background: '#131e13',
                    surface: '#1c2d1c',
                    // surface: '#203120',
                    primary: colors.lightGreen.lighten4,
                    secondary: colors.lightGreen.lighten5,
                    'surface-variant': colors.lightGreen.lighten1,
                    error: '#d0733b',
                },
            },
        },
    },
    icons: {
        aliases,
        sets: {
            mdi,
        },
    },
});
