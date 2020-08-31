import Vue from "vue";
import Vuex from "vuex";
import {
  login,
  signUp,
  deleteList,
  changePassword,
  logout,
} from "../assets/js/ListDispatcher";

import {
  getAllShoppingItems,
  addItem,
  updateItem,
  deleteItem,
  getShoppingItemCategories,
  deleteAllItems,
  // updateItems,
  search,
  unmarkAllItems,
} from "../assets/js/ItemsDispatcher";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allShoppingItems: [],
    categories: {}, // this will be replaced with an array of strings once I hook up the google categories
    isLoggedIn: false,
    enableSync: false,
    isSyncing: false,
    isLoading: false,
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
      state.allShoppingItems.splice(
        payload.oldItemIndex,
        1,
        payload.shoppingItemDTO
      );
    },
    deleteItem(state, targetItemIndex) {
      state.allShoppingItems.splice(targetItemIndex, 1);
    },
    clearItems(state) {
      state.allShoppingItems = [];
    },
    clearCategories(state) {
      state.categories = {};
    },
    setAuthToken(state, token) {
      state.authToken = token;
    },
    setIsLoggedIn(state, boolean) {
      state.isLoggedIn = boolean;
    },
    setEnableSync(state, boolean) {
      state.enableSync = boolean;
    },
    setIsLoading(state, boolean) {
      state.isLoading = boolean;
    },
    toggleIsSyncing(state) {
      state.isSyncing = !state.isSyncing;
    },
  },
  actions: {
    async loadItemsAndCategories(context) {
      context.dispatch("toggleLoading");
      let areCategoriesLoaded = await context.dispatch("refreshCategories");
      let areItemsLoaded = await context.dispatch("refreshItemsList");
      if (areItemsLoaded && areCategoriesLoaded) {
        context.dispatch("toggleLoading");
        context.dispatch("timedSync");
      }
    },
    async timedSync(context) {
      if (context.state.enableSync && !context.state.isSyncing) {
        if (context.state.isLoggedIn && !context.state.isLoading) {
          context.commit("toggleIsSyncing");
          let promise = new Promise((res) => {
            setTimeout(() => res("Now it's done!"), 10000);
          });
          let promiseTimeout = await promise;

          if (promiseTimeout && !context.state.isLoading) {
            // if (promiseTimeout) {
            console.log("syncing info");
            context.dispatch("refreshItemsList");
            context.commit("toggleIsSyncing");
            context.dispatch("timedSync");
          }
        }
      }
    },
    async refreshItemsList(context) {
      let response = await getAllShoppingItems(context.state.authToken);
      let shoppingItems = await context.dispatch(
        "handleObjectResponse",
        response
      );
      if (shoppingItems !== null) {
        context.commit("refreshItemsList", shoppingItems);
        return true;
      } else return false;
    },
    async refreshCategories(context) {
      let response = await getShoppingItemCategories(context.state.authToken);
      let shoppingItemCategories = await context.dispatch(
        "handleObjectResponse",
        response
      );
      let categoryTitlesArray = [];
      if (shoppingItemCategories !== null) {
        shoppingItemCategories.forEach((category) => {
          categoryTitlesArray.push(category.categoryName);
        });
        context.commit("refreshCategories", categoryTitlesArray);
        return true;
      } else return false;
    },
    async addNewShoppingItem(context, shoppingItemDTO) {
      context.dispatch("toggleLoading");
      let response = await addItem(shoppingItemDTO, context.state.authToken);
      let newShoppingItem = await context.dispatch(
        "handleObjectResponse",
        response
      );
      if (newShoppingItem !== null) {
        context.commit("addItem", newShoppingItem);
        context.dispatch("toggleLoading");
        return true;
      } else {
        context.dispatch("toggleLoading");
        return false;
      }
    },
    async updateItem(context, shoppingItemDTO) {
      context.dispatch("toggleLoading");
      const token = context.state.authToken;
      let response = await updateItem(shoppingItemDTO, token);
      let updatedShoppingItem = await context.dispatch(
        "handleObjectResponse",
        response
      );
      if (updatedShoppingItem !== null) {
        let oldItemIndex;
        context.state.allShoppingItems.forEach((item, index) => {
          if (item.id === updatedShoppingItem.id) {
            oldItemIndex = index;
          }
        });
        let payload = {
          oldItemIndex: oldItemIndex,
          shoppingItemDTO: updatedShoppingItem,
        };
        context.commit("updateItem", payload);
        context.dispatch("toggleLoading");
        return true;
      } else {
        context.dispatch("toggleLoading");
        return false;
      }
    },
    async deleteItem(context, shoppingItemDTO) {
      context.dispatch("toggleLoading");
      let response = await deleteItem(shoppingItemDTO, context.state.authToken);
      let isResponseOk = await context.dispatch(
        "handleBooleanResponse",
        response
      );
      if (isResponseOk) {
        let targetItemIndex;
        context.state.allShoppingItems.forEach((item, index) => {
          if (item.id === shoppingItemDTO.id) {
            targetItemIndex = index;
          }
        });
        if (targetItemIndex !== undefined) {
          context.commit("deleteItem", targetItemIndex);
          context.dispatch("toggleLoading");
          return true;
        }
      }
      context.dispatch("toggleLoading");
      return false;
    },
    async deleteItemsInCart(context) {
      context.dispatch("toggleLoading");
      let response = await deleteAllItems(context.state.authToken);
      if (response.ok) {
        context.dispatch("refreshItemsList");
        context.dispatch("toggleLoading");
        return true;
      } else {
        context.dispatch("toggleLoading");
        return false;
      }
    },
    async unmarkItemsInCart(context) {
      context.dispatch("toggleLoading");
      let response = await unmarkAllItems(context.state.authToken);
      let responseObj = await context.dispatch(
        "handleObjectResponse",
        response
      );

      if (responseObj !== undefined) {
        responseObj.forEach((responseItem) => {
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
        context.dispatch("toggleLoading");
        return true;
      } else {
        context.dispatch("toggleLoading");
        return false;
      }
    },
    async search(context, itemName) {
      let response = await search(itemName, context.state.authToken);
      let responseObj = await context.dispatch(
        "handleObjectResponse",
        response
      );
      return responseObj;
    },
    async registerUser(context, loginAttempt) {
      context.dispatch("toggleLoading");
      let response = await signUp(loginAttempt);
      let responseObj = await response.json();
      if (responseObj === null || responseObj === undefined) {
        await context.dispatch("toggleLoading");
        return null;
      } else {
        context.dispatch("toggleLoading");
        return responseObj;
      }
    },
    async login(context, loginRequest) {
      context.dispatch("toggleLoading");
      let response = await login(loginRequest);
      let obj = await response.json();
      if (obj.token !== undefined) {
        // if (response.ok) {
        context.commit("setAuthToken", obj.token);
        context.commit("setIsLoggedIn", true);
        context.dispatch("toggleLoading");
        context.commit("setEnableSync", true);
        context.dispatch("loadItemsAndCategories");
        return obj;
      } else {
        context.dispatch("toggleLoading");
        return obj;
      }
    },
    logOut(context) {
      if (context.state.isLoggedIn) {
        logout(context.state.authToken);
        context.commit("clearItems");
        context.commit("clearCategories");
        context.commit("setAuthToken", "");
        context.commit("setIsLoggedIn", false);
        context.commit("setEnableSync", false);
      }
    },
    async deleteList(context) {
      console.log("should fire from store");
      context.dispatch("toggleLoading");
      let response = await deleteList(context.state.authToken);
      if (response.ok) {
        let obj = await response.json();
        alert(obj.message);
        context.dispatch("logOut");
      }
    },
    async changePassword(context, passwords) {
      let passwordChangeAttempt = {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      };

      let response = await changePassword(
        passwordChangeAttempt,
        context.state.authToken
      );
      let responseText = await context.dispatch("handleTextResponse", response);

      return responseText;
    },
    async handleObjectResponse(context, response) {
      if (response.ok) {
        return response.json();
      }
      if (response.status !== 200) {
        context.dispatch("logOut");
        let responseText = response.message;
        console.log(responseText);
      }
    },
    async handleTextResponse(context, response) {
      if (response.status === 403) {
        context.dispatch("logOut");
      }
      return await response.text();
    },
    async handleBooleanResponse(context, response) {
      if (response.ok) {
        return true;
      }
      if (response.status === 403) {
        context.dispatch("logOut");
      }
      return false;
    },
    async toggleLoading(context) {
      if (context.state.isLoading) {
        context.commit("setIsLoading", false);
      } else {
        let promise = new Promise((res) => {
          setTimeout(() => res("Now it's done!"), 10000);
        });
        context.commit("setIsLoading", true);
        let promiseTimeout = await promise;
        if (promiseTimeout && context.state.isLoading) {
          context.dispatch("logOut");
          context.commit("setIsLoading", false);
        }
      }
    },
  },
  getters: {
    itemCategories: (state) => {
      return state.categories;
    },
    getItems: (state) => (isInCart) => {
      let filteredArray = [];
      state.allShoppingItems.forEach((item) => {
        if (item !== undefined && item.inCart === isInCart) {
          filteredArray.push(item);
        }
      });
      return filteredArray;
    },
    getPendingItemsByCategory: (state) => (requestedCategory) => {
      let filteredArray = [];
      state.allShoppingItems.forEach((item) => {
        if (item.itemCategory === requestedCategory && item.inCart === false) {
          filteredArray.push(item);
        }
      });
      return filteredArray;
    },
    notEmptyCategories: (state, getters) => {
      let filteredCategories = [];
      for (let categoryIndex in state.categories) {
        const categoryTitle = state.categories[categoryIndex];
        getters.getItems(false).forEach((item) => {
          if (item.itemCategory === categoryTitle) {
            filteredCategories.push(categoryTitle);
            return;
          }
        });
      }
      return new Set(filteredCategories);
    },
    isUserLoggedIn: (state) => {
      return state.isLoggedIn;
    },
    isLoading: (state) => {
      return state.isLoading;
    },
    getAuthToken: (state) => {
      return state.authToken;
    },
  },
});
