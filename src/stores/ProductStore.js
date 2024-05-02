import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useUserStore } from './UserStore.js';

export const useProductStore = defineStore('productStore', () => {
    const products = ref([]);

    const getProductById = computed(() => (productId) => products.value.find((item) => item?.id === productId));
    const subtotal = computed(() => products.value.reduce((total, item) => total + +item?.price, 0));
    const totalCountProducts = computed(() => products.value.length);
    const checkDataTitles = computed(() => !products.value.find((item) => item?.title.length === 0));
    const checkDataPrices = computed(() => !products.value.find((item) => item?.price.length === 0));
    const checkDataUsers = computed(() => !products.value.find((item) => item?.users.length === 0));

    const addUserProduct = computed(() => {
        return (productId, userId) => {
            const productStore = useProductStore();
            const product = productStore.getProductById(productId);
            const indexUser = product?.users.indexOf(userId);
            if (indexUser === -1) product?.users.push(userId);
            else product?.users.splice(indexUser, 1);
        };
    });
    const addAllUserProduct = computed(() => {
        return (productId) => {
            const productStore = useProductStore();
            const userStore = useUserStore();
            const product = productStore.getProductById(productId);
            const countActiveUsers = product?.users.length;
            const countAllUsers = userStore.totalCountUsers;
            product?.users.splice(0, product?.users.length);
            if (countActiveUsers !== countAllUsers) userStore.users.forEach((user) => product?.users.push(user.id));
        };
    });
    const checkCountUsers = computed(() => {
        return (productId) => {
            const productStore = useProductStore();
            const product = productStore.getProductById(productId);
            const countActiveUsers = product.users.length;
            const userStore = useUserStore();
            const countAllUsers = userStore.totalCountUsers;
            return countActiveUsers === countAllUsers;
        };
    });
    const checkUser = computed(() => {
        return (productId, userId) => {
            const productStore = useProductStore();
            const product = productStore.getProductById(productId);
            return product?.users.includes(userId);
        };
    });

    const addProduct = () => {
        const userStore = useUserStore();
        products.value.push({
            id: Date.now(),
            title: '',
            price: '',
            payer: userStore.users[0],
            users: [],
        });
    };
    const removeProduct = (id) => (products.value = products.value.filter((item) => item?.id !== id));
    const copyProduct = (id) => {
        const productStore = useProductStore();
        const product = productStore.getProductById(id);
        products.value.push({
            ...product,
            id: Date.now(),
            users: [...product?.users],
        });
    };

    return {
        products,
        useProductStore,
        addProduct,
        removeProduct,
        copyProduct,
        getProductById,
        totalCountProducts,
        checkDataTitles,
        checkDataPrices,
        checkDataUsers,
        subtotal,
        addUserProduct,
        addAllUserProduct,
        checkCountUsers,
        checkUser,
    };
});
