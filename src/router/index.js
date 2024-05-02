import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Usernames from '../pages/Users.vue';
import Precheck from '../pages/Precheck.vue';
import Result from '../pages/Result.vue';

const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home,
    },
    {
        name: 'Usernames',
        path: '/usernames',
        component: Usernames,
    },
    {
        name: 'PreCheck',
        path: '/pre-check',
        component: Precheck,
    },
    {
        name: 'Result',
        path: '/result',
        component: Result,
    },
];

export const router = createRouter({
    history: createWebHistory('/delim-check/'),
    routes,
});
