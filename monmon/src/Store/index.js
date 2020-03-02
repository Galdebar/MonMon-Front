import Vue from 'vue';
import Vuex from 'vuex';
import {
    getAllShoppingItems,
    addItem,
    updateItem,
    deleteItem,
    getShoppingItemCategories,
    deleteItems,
    updateItems
} from "../assets/js/Dispatcher";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        allShoppingItems: [],
        categories: {}, // this will be replaced with an array of strings once I hook up the google categories
        isLoggedIn: true,
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
        },
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
            let categoryTitlesArray = [];
            if (shoppingItemCategories !== null) {
                shoppingItemCategories.forEach(category =>{
                    categoryTitlesArray.push(category.categoryName);
                });
                context.commit('refreshCategories', categoryTitlesArray);
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
        },
        async deleteItemsInCart(context) {
            const allItemsInCart = context.getters.getItems(true);
            let isResponseOk = await deleteItems(allItemsInCart);
            if (isResponseOk) {
                allItemsInCart.forEach(shoppingItemDTO => {
                    let targetItemIndex;
                    context.state.allShoppingItems.forEach((item, index) => {
                        if (item.id === shoppingItemDTO.id) {
                            targetItemIndex = index;
                            context.commit("deleteItem", targetItemIndex);
                        }
                    });
                });

            } else return false;
        },
        async unmarkItemsInCart(context) {
            const allItemsInCart = context.getters.getItems(true);
            allItemsInCart.forEach(item => {
                item.isInCart = false
            });
            let response = await updateItems(allItemsInCart);

            if (response !== undefined) {
                response.forEach(responseItem => {
                    context.state.allShoppingItems.forEach((storedItem, index) => {
                        if (storedItem.id === responseItem.id) {
                            let payloadItem = {
                                oldItemIndex: index,
                                shoppingItemDTO: responseItem,
                            };
                            context.commit("updateItem", payloadItem);
                        }
                    });
                });
                return true;
            } else return false;
        }
    },
    getters: {
        itemCategories: state => {
            return state.categories;
        },
        getItems: (state) => (isInCart) => {
            let filteredArray = [];
            state.allShoppingItems.forEach(item => {
                if (item !== undefined && item.isInCart === isInCart) {
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
            let filteredCategories = [];
            for (let categoryIndex in state.categories) {
                const categoryTitle = state.categories[categoryIndex];
                getters.getItems(false).forEach(item => {
                    if (item.itemCategory === categoryTitle) {
                        filteredCategories.push(categoryTitle);
                        return;
                    }
                });
            }
            return new Set(filteredCategories);

        },
        isUserLoggedIn: state => {
            return state.isLoggedIn;
        }
    }
})