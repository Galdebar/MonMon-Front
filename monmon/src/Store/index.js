import Vue from 'vue';
import Vuex from 'vuex';
import {getAllShoppingItems, addItem, updateItem, deleteItem, getShoppingItemCategories} from "../assets/js/Dispatcher";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        allShoppingItems: [],
        categories: {} // this will be replaced with an array of strings once I hook up the google categories
    },
    mutations: {
        refreshItemsList(state, payload) {
            state.allShoppingItems = payload;
        },
        refreshCategories(state, payload) {
            state.categories = payload;
        },
        addItem(state, payload) {
            state.allShoppingItems.push(payload);
        },
        updateItem(state, payload) {
            state.allShoppingItems.splice(payload.oldItemIndex, 1, payload.shoppingItemDTO);
        },
        deleteItem(state, targetItemIndex) {
            state.allShoppingItems.splice(targetItemIndex, 1);
        }
    },
    actions: {
        async refreshItemsList(context) {
            let shoppingItems = await getAllShoppingItems();
            if (shoppingItems !== null) {
                context.commit('refreshItemsList', shoppingItems);
                return true;
            } else return false;
        },
        async refreshCategories(context) {
            let shoppingItemCategories = await getShoppingItemCategories();
            if (shoppingItemCategories !== null) {
                context.commit('refreshCategories', shoppingItemCategories);
                return true;
            } else return false;
        },
        async addNewShoppingItem(context, shoppingItemDTO) {
            let newShoppingItem = await addItem(shoppingItemDTO);
            if (newShoppingItem !== null) {
                context.commit('addItem', newShoppingItem);
                return true;
            } else return false;
        },
        async updateItem(context, shoppingItemDTO) {
            let updatedShoppingItem = await updateItem(shoppingItemDTO);
            if (updatedShoppingItem !== null) {
                let oldItemIndex;
                context.state.allShoppingItems.forEach((item, index) => {
                    if (item.id === updatedShoppingItem.id) {
                        oldItemIndex = index;
                    }
                });
                let payload = {
                    oldItemIndex: oldItemIndex,
                    shoppingItemDTO: updatedShoppingItem
                };
                context.commit('updateItem', payload);
                return true;
            } else return false;
        },
        async deleteItem(context, shoppingItemDTO) {
            let isResponseOK = await deleteItem(shoppingItemDTO);
            if (isResponseOK) {
                let targetItemIndex;
                context.state.allShoppingItems.forEach((item, index) => {
                    if (item.id === shoppingItemDTO.id) {
                        targetItemIndex = index;
                    }
                });
                if (targetItemIndex !== undefined) {
                    context.commit("deleteItem", targetItemIndex);
                    return true;
                }
            }
            return false;
        }
    },
    getters: {
        itemCategories: state => {
            return state.categories;
        },
        getItems: (state) => (isInCart) => {
            let filteredArray = [];
            state.allShoppingItems.forEach(item => {
                if (item.isInCart === isInCart) {
                    filteredArray.push(item);
                }
            });
            return filteredArray;
        },
        getPendingItemsByCategory: state => (requestedCategory) => {
            let filteredArray = [];
            state.allShoppingItems.forEach(item => {
                if (item.itemCategory === requestedCategory) {
                    filteredArray.push(item);
                }
            });
            return filteredArray;
        },
        notEmptyCategories: (state, getters) => {
            let filteredCategories = {};
            for (let categoryKey in state.categories) {
                const categoryTitle = state.categories[categoryKey];
                getters.getItems(false).forEach(item => {
                    if (item.itemCategory === categoryTitle) {
                        filteredCategories[categoryKey] = categoryTitle;
                        return;
                    }
                });
            }
            return filteredCategories;
        },
    }
})