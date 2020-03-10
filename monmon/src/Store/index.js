import Vue from 'vue';
import Vuex from 'vuex';
import {
    getAllShoppingItems,
    addItem,
    updateItem,
    deleteItem,
    getShoppingItemCategories,
    deleteItems,
    updateItems,
    login,
    loginGithub
} from "../assets/js/Dispatcher";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        allShoppingItems: [],
        categories: {}, // this will be replaced with an array of strings once I hook up the google categories
        isLoggedIn: false,
        isLoading: false,
        userEmail: "",
        authToken: "",
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
        clearItems(state) {
            state.allShoppingItems = []
        },
        clearCategories(state) {
            state.categories = {}
        },
        setUserEmail(state, userEmail) {
            state.userEmail = userEmail;
        },
        setAuthToken(state, token) {
            state.authToken = token;
        },
        setIsLoggedIn(state, boolean) {
            state.isLoggedIn = boolean;
        },
        setIsLoading(state, boolean) {
            state.isLoading = boolean;
        }
    },
    actions: {
        async loadItemsAndCategories(context) {
            // context.toggleLoading();
            context.dispatch("toggleLoading");
            let areItemsLoaded = await context.dispatch("refreshItemsList");
            let areCategoriesLoaded = await context.dispatch("refreshCategories");
            if (areItemsLoaded && areCategoriesLoaded) {
                context.dispatch("toggleLoading");
                // context.toggleLoading();
            }
        },
        async refreshItemsList(context) {
            let shoppingItems = await getAllShoppingItems(context.state.authToken);
            if (shoppingItems !== null) {
                context.commit('refreshItemsList', shoppingItems);
                return true;
            } else return false;

        },
        async refreshCategories(context) {
            let shoppingItemCategories = await getShoppingItemCategories(context.state.authToken);
            let categoryTitlesArray = [];
            if (shoppingItemCategories !== null) {
                shoppingItemCategories.forEach(category => {
                    categoryTitlesArray.push(category.categoryName);
                });
                context.commit('refreshCategories', categoryTitlesArray);
                return true;
            } else return false;

        },
        async addNewShoppingItem(context, shoppingItemDTO) {
            // context.toggleLoading();
            context.dispatch("toggleLoading");
            let newShoppingItem = await addItem(shoppingItemDTO, context.state.authToken);
            if (newShoppingItem !== null) {
                context.commit('addItem', newShoppingItem);
                context.dispatch("toggleLoading");
                // context.toggleLoading();
                return true;
            } else {
                context.dispatch("toggleLoading");
                // context.toggleLoading();
                return false;
            }
        },
        async updateItem(context, shoppingItemDTO) {
            // context.toggleLoading();
            context.dispatch("toggleLoading");
            const token = context.state.authToken;
            let updatedShoppingItem = await updateItem(shoppingItemDTO, token);
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
                // context.toggleLoading();
                context.dispatch("toggleLoading");
                return true;
            } else {
                // context.toggleLoading();
                context.dispatch("toggleLoading");
                return false;
            }
        },
        async deleteItem(context, shoppingItemDTO) {
            // context.toggleLoading();
            context.dispatch("toggleLoading");
            let isResponseOK = await deleteItem(shoppingItemDTO, context.state.authToken);
            if (isResponseOK) {
                let targetItemIndex;
                context.state.allShoppingItems.forEach((item, index) => {
                    if (item.id === shoppingItemDTO.id) {
                        targetItemIndex = index;
                    }
                });
                if (targetItemIndex !== undefined) {
                    context.commit("deleteItem", targetItemIndex);
                    // context.toggleLoading();
                    context.dispatch("toggleLoading");
                    return true;
                }
            }
            // context.toggleLoading();
            context.dispatch("toggleLoading");
            return false;
        },
        async deleteItemsInCart(context) {
            // context.toggleLoading();
            context.dispatch("toggleLoading");
            const allItemsInCart = context.getters.getItems(true);
            let isResponseOk = await deleteItems(allItemsInCart, context.state.authToken);
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

                // context.toggleLoading();
                context.dispatch("toggleLoading");
                return true;
            } else {
                // context.toggleLoading();
                context.dispatch("toggleLoading");
                return false;
            }

        },
        async unmarkItemsInCart(context) {
            // context.toggleLoading();
            context.dispatch("toggleLoading");
            const allItemsInCart = context.getters.getItems(true);
            allItemsInCart.forEach(item => {
                item.isInCart = false
            });
            let response = await updateItems(allItemsInCart, context.state.authToken);

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
                // context.toggleLoading();
                context.dispatch("toggleLoading");
                return true;
            } else {
                // context.toggleLoading();
                context.dispatch("toggleLoading");
                return false;
            }
        },
        async login(context, loginRequest) {
            // context.toggleLoading();
            context.dispatch("toggleLoading");
            let responseObj = await login(loginRequest);
            if (responseObj != undefined) {
                context.commit("setUserEmail", responseObj["userEmail"]);
                context.commit("setAuthToken", responseObj["token"]);
                context.commit("setIsLoggedIn", true);
                // context.toggleLoading();
                context.dispatch("toggleLoading");
                return true;
            } else{
                // context.toggleLoading();
                context.dispatch("toggleLoading");
            }
        },
        async githubLogin(){
            let response = await loginGithub();
            console.log(response);
        },
        logOut(context) {
            if (context.state.isLoggedIn) {
                context.commit("clearItems");
                context.commit("clearCategories");
                context.commit("setUserEmail", "");
                context.commit("setAuthToken", "");
                context.commit("setIsLoggedIn", false);
            }
        },
        async toggleLoading(context) {
            let promise = new Promise((res,) => {
                setTimeout(() => res("Now it's done!"), 1000)
            });
            context.commit(
                "setIsLoading",
                !context.state.isLoggedIn
            );
            let promiseTimeout = await promise;
            if(promiseTimeout && context.state.isLoading){
                context.dispatch("logOut");
                context.commit("setIsLoading", !context.state.isLoading);
            }
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
                if (item.itemCategory === requestedCategory && item.isInCart == false) {
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
        },
        isLoading: state => {
            return state.isLoading;
        },
        getUserEmail: state => {
            return state.userEmail;
        },
        getAuthToken: state => {
            return state.authToken;
        }
    }
})