import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useProductStore } from './ProductStore.js';

export const useUserStore = defineStore('userStore', () => {
    const users = ref([]);

    const totalCountUsers = computed(() => users.value.length);
    const checkDataUsers = computed(() => {
        if (users.value.find((item) => !item?.username.length)) return false;
        const uniqueNames = new Set();
        users.value.forEach((item) => uniqueNames.add(item?.username));
        return uniqueNames.size === users.value.length;
    });
    const getUserById = computed(() => (userId) => users.value.find((item) => item?.id === userId));

    const addUser = () => {
        users.value.push({
            id: Date.now(),
            username: '',
            transactions: new Map(),
            creditors: new Map(),
            debtors: new Map(),
        });
    };
    const removeUser = (id) => (users.value = users.value.filter((item) => item?.id !== id));
    const fillTransactions = (user) => {
        const storeProduct = useProductStore();
        const activeProducts = storeProduct.products.filter(
            (item) => item.users.find((item) => item === user.id) && item.payer.id !== user.id,
        );
        activeProducts.forEach((item) => {
            const amount = +(item.price / item.users.length).toFixed(2);
            if (user.transactions.has(item.payer.id))
                user.transactions.set(item.payer.id, user.transactions.get(item.payer.id) + amount);
            else user.transactions.set(item.payer.id, amount);
        });
    };
    const fillDebtors = (creditor) => {
        const userStore = useUserStore();
        userStore.users.forEach((user) => {
            if (user.transactions.has(creditor.id)) {
                const deb = user.transactions.get(creditor.id);
                if (creditor.transactions.has(user.id)) {
                    const credit = creditor.transactions.get(user.id);
                    if (credit > deb) creditor.debtors.set(user.username, credit - deb);
                } else {
                    creditor.debtors.set(user.username, deb);
                }
            }
        });
    };
    const fillCreditors = (debtor) => {
        const userStore = useUserStore();
        debtor.transactions.forEach((value, key) => {
            const creditor = userStore.getUserById(key);
            if (!creditor?.transactions.has(debtor.id)) debtor.creditors.set(creditor?.username, value);
            else {
                const credit = creditor?.transactions.get(debtor.id);
                if (value > credit) debtor.creditors.set(creditor?.username, value - credit);
            }
        });
    };
    const clearTransactions = () => {
        users.value.forEach((item) => {
            item?.transactions.clear();
            item?.creditors.clear();
            item?.debtors.clear();
        });
    };

    return {
        users,
        totalCountUsers,
        checkDataUsers,
        getUserById,
        addUser,
        removeUser,
        fillTransactions,
        fillDebtors,
        fillCreditors,
        clearTransactions,
    };
});
