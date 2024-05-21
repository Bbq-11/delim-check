import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

export const useProductStore = defineStore('productStore', () => {
    const products = ref([]);

    const productsInLocalStorage = localStorage.getItem('products');
    if (productsInLocalStorage) products.value = JSON.parse(productsInLocalStorage)._value;

    const subtotal = computed(() => {
        const result = +products.value.reduce((total, item) => total + +item?.price, 0);
        return +result.toFixed(2);
    });
    const totalCountProducts = computed(() => products.value.length);
    const checkDataTitles = computed(() => !products.value.find((item) => item?.title.length === 0));
    const checkDataPrices = computed(
        () => !products.value.find((item) => !/^([1-9][0-9]*(\.[0-9]{0,2})?|0\.[0-9]{0,2})$/.test(item?.price)),
    );
    const checkDataUsers = computed(() => !products.value.find((item) => item?.users.length === 0));

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
    const addUserProduct = (productId, userId) => {
        const product = products.value.find((item) => item?.id === productId);
        const indexUser = product?.users.indexOf(userId);
        if (indexUser === -1) product?.users.push(userId);
        else product?.users.splice(indexUser, 1);
    };
    const clearUsersProduct = (productId) => {
        const product = products.value.find((item) => item?.id === productId);
        product?.users.splice(0);
    };

    watch(
        () => products,
        (state) => localStorage.setItem('products', JSON.stringify(state)),
        { deep: true },
    );

    return {
        products,
        addProduct,
        removeProduct,
        copyProduct,
        addUserProduct,
        clearUsersProduct,
        totalCountProducts,
        checkDataTitles,
        checkDataPrices,
        checkDataUsers,
        subtotal,
    };
});
