import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUserStore = defineStore('userStore', () => {
    const users = ref([]);

    const totalCountUsers = computed(() => users.value.length);
    const checkDataUsers = computed(() => {
        if (users.value.find((item) => !item?.username.length)) return false;
        const uniqueNames = new Set();
        users.value.forEach((item) => uniqueNames.add(item?.username));
        return uniqueNames.size === users.value.length;
    });

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
    const fillTransactions = (product, user) => {
        const amount = +(product.price / product.users.length).toFixed(4);
        if (user.transactions.has(product.payer.id))
            user.transactions.set(product.payer.id, user.transactions.get(product.payer.id) + amount);
        else user.transactions.set(product.payer.id, amount);
    };
    const fillDebtors = (creditor) => {
        users.value.forEach((user) => {
            if (user?.transactions.has(creditor.id)) {
                const debit = user?.transactions.get(creditor.id);
                if (creditor.transactions.has(user?.id)) {
                    const credit = creditor.transactions.get(user?.id);
                    if (credit > debit) creditor.debtors.set(user?.username, credit - debit);
                } else {
                    creditor.debtors.set(user?.username, debit);
                }
            }
        });
    };
    const fillCreditors = (debtor) => {
        debtor.transactions.forEach((value, key) => {
            const creditor = users.value.find((item) => item?.id === key);
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
        addUser,
        removeUser,
        fillTransactions,
        fillDebtors,
        fillCreditors,
        clearTransactions,
        totalCountUsers,
        checkDataUsers,
    };
});
