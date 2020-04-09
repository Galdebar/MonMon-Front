import {defaulturl, checkResponse} from "./DispatcherGeneral";
const shoppingItemsPath = "shoppingitems/";
const categorySearchPath = "categorysearch/";
const getAllPrefix = "getall";
const updateSinglePrefix = "updateitem";
const updateMultiplePrefix = "updateitems";
const deleteSinglePrefix = "deleteitem";
const deleteMultiplePrefix = "deleteitems";
const addPrefix = "additem";

export async function getAllShoppingItems(authToken) {
    const url = defaulturl + shoppingItemsPath + getAllPrefix;
    let response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${authToken}`,
        }
    });
    return await checkResponse(response);
}

export async function getShoppingItemCategories(authToken) {
    const url = defaulturl + categorySearchPath + getAllPrefix;
    let response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${authToken}`,
        }
    });
    return await checkResponse(response);
}

export async function addItem(shoppingItemDTO, authToken) {
    const url = defaulturl + shoppingItemsPath + addPrefix;
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(shoppingItemDTO)
    });
    return await checkResponse(response);
}

export async function updateItem(shoppingItemDTO, authToken) {
    const url = defaulturl + shoppingItemsPath + updateSinglePrefix;
    let response = await fetch(url, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(shoppingItemDTO)
    });
    return await checkResponse(response);
}

export async function updateItems(itemsArray, authToken) {
    const url = defaulturl + shoppingItemsPath + updateMultiplePrefix;
    let response = await fetch(url, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(itemsArray)
    });
    return await checkResponse(response);
}

export async function deleteItem(shoppingItemDTO, authToken) {
    const url = defaulturl + shoppingItemsPath + deleteSinglePrefix;
    let response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(shoppingItemDTO)
    });
    return response.ok;
}

export async function deleteItems(itemsArray, authToken) {
    const url = defaulturl + shoppingItemsPath + deleteMultiplePrefix;
    let response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(itemsArray)
    });
    return response.ok;
}

export async function search(searchString, authToken) {
    const url = defaulturl + categorySearchPath;
    if (searchString !== "") {
      const searchObject = {
        shoppingItemCategory: "",
        keyword: searchString,
      };
      let response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchObject),
      });
      return await checkResponse(response);
    }
  }

// async function checkResponse(response) {
//     if (response.ok) {
//         return await response.json();
//     } else return null;
// }