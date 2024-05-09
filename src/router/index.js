import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../pages/Home.vue';
// import Usernames from '../pages/Users.vue';
// import Precheck from '../pages/Precheck.vue';
// import Result from '../pages/Result.vue';
const Home = () => import('../pages/Home.vue');
const Users = () => import('../pages/Users.vue');
const Precheck = () => import('../pages/Precheck.vue');
const Result = () => import('../pages/Result.vue');

export const router = createRouter({
    history: createWebHistory('/delim-check/'),
    routes: [
        { path: '/', component: Home },
        { path: '/usernames', component: Users },
        { path: '/pre-check', component: Precheck },
        { path: '/result', component: Result },
    ],
});
