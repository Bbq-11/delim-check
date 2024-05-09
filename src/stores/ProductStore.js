import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useProductStore = defineStore('productStore', () => {
    const products = ref([]);

    const subtotal = computed(() => products.value.reduce((total, item) => total + +item?.price, 0));
    const totalCountProducts = computed(() => products.value.length);
    const checkDataTitles = computed(() => !products.value.find((item) => item?.title.length === 0));
    const checkDataPrices = computed(
        () => !products.value.find((item) => item?.price.length === 0 || item?.price <= 0),
    );
    const checkDataUsers = computed(() => !products.value.find((item) => item?.users.length === 0));

    const addUserProduct = (productId, userId) => {
        const product = products.value.find((item) => item?.id === productId);
        const indexUser = product?.users.indexOf(userId);
        if (indexUser === -1) product?.users.push(userId);
        else product?.users.splice(indexUser, 1);
    };
    const clearUserProducts = (productId) => {
        const product = products.value.find((item) => item?.id === productId);
        product?.users.splice(0);
    };

    const checkUser = computed(() => {
        return (productId, userId) => {
            const product = products.value.find((item) => item?.id === productId);
            return product?.users.includes(userId);
        };
    });

    const addProduct = (defaultUser) => {
        products.value.push({
            id: Date.now(),
            title: '',
            price: '',
            payer: defaultUser,
            users: [],
        });
    };
    const removeProduct = (id) => (products.value = products.value.filter((item) => item?.id !== id));
    const copyProduct = (productId) => {
        const product = products.value.find((item) => item?.id === productId);
        products.value.push({
            ...product,
            id: Date.now(),
            users: [...product?.users],
        });
    };

    return {
        products,
        useProductStore,
        clearUserProducts,
        addProduct,
        removeProduct,
        copyProduct,
        totalCountProducts,
        checkDataTitles,
        checkDataPrices,
        checkDataUsers,
        subtotal,
        addUserProduct,
        checkUser,
    };
});
