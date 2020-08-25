import {defaulturl} from "./DispatcherGeneral";
const shoppingItemsPath = "items/";
const categoryPath = "categories/";
const searchPrefix = "search";
const getAllPrefix = "getall";
const updateSinglePrefix = "update";
const updateMultiplePrefix = "updateitems"; // not functioning for now
const unmarkAllItemsPrefix = "unmark/all";
const deleteSinglePrefix = "delete";
const deleteAllInCart = "delete/incart";
const addPrefix = "add";

export async function getAllShoppingItems(authToken) {
    const url = defaulturl + shoppingItemsPath + getAllPrefix;
    let response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${authToken}`,
        }
    });
    return response;
}

export async function getShoppingItemCategories(authToken) {
    const url = defaulturl + categoryPath + getAllPrefix;
    let response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${authToken}`,
        }
    });
    return response;
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
    return response;
}

export async function updateItem(shoppingItemDTO, authToken) {
    const url = defaulturl + shoppingItemsPath + updateSinglePrefix;
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(shoppingItemDTO)
    });
    return response;
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
    return response;
}

export async function unmarkAllItems(authToken) {
    const url = defaulturl + shoppingItemsPath + unmarkAllItemsPrefix;
    let response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json"
        },
    });
    return response;
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
    return response;
}

// export async function deleteItems(itemsArray, authToken) {
//     const url = defaulturl + shoppingItemsPath + deleteMultiplePrefix;
//     let response = await fetch(url, {
//         method: "DELETE",
//         headers: {
//             "Authorization": `Bearer ${authToken}`,
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(itemsArray)
//     });
//     return response;
// }

export async function deleteAllItems(authToken){
    const url = defaulturl + shoppingItemsPath + deleteAllInCart;
    let response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json"
        },
    });

    return response;
}

export async function search(searchString, authToken) {
    const url = defaulturl + categoryPath + searchPrefix;
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
      return response;
    }
  }

// async function checkResponse(response) {
//     if (response.ok) {
//         return await response.json();
//     } else return null;
// }