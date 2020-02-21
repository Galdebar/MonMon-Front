const defaulturl = "http://localhost:8080/";
const shoppingItemsPath = "shoppingitems/";
const categorySearchPath = "categorysearch/";
const searchPrefix = "?search=";


export async function getAllShoppingItems(){
    const url = defaulturl + shoppingItemsPath + "getAll";
    let response = await fetch(url);
    return await checkResponse(response);
}

export async function getShoppingItemCategories(){
    const url = defaulturl + categorySearchPath + "getall";
    let response = await fetch(url);
    return await checkResponse(response);
}

export async function updateItem(shoppingItemDTO){
    const url = defaulturl + shoppingItemsPath + `{id=${shoppingItemDTO.id}`;
    let response = await fetch(url,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shoppingItemDTO)
    });
    return await checkResponse(response);
}

export async function updateItems(itemsArray){
    const url = defaulturl + shoppingItemsPath + "updateItems";
    let response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemsArray)
    });
    return response.ok;
}

export async function deleteItem(shoppingItemDTO){
    const url = defaulturl + shoppingItemsPath + `{id=${shoppingItemDTO.id}`;
    let response = await fetch(url,{
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shoppingItemDTO)
    });
    return response.ok;
}

export async function deleteItems(itemsArray){
    const url = defaulturl + shoppingItemsPath + "deleteItems";
    let response = await fetch(url, {
        method:"DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemsArray)
    });
    return response.ok;
}

export async function addItem(shoppingItemDTO){
    const url = defaulturl + shoppingItemsPath;
    let response = await fetch(url, {
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shoppingItemDTO)
    });
    return await checkResponse(response);
}

export async function search(searchString){
    const url = defaulturl + categorySearchPath + searchPrefix + searchString;
    if(searchString !== ""){
        let response = await fetch(url);
        if(response.ok){
            return await response.json();
        } else return "";
    }
}

async function checkResponse(response){
    if(response.ok){
        let responseObj = await response.json();
        return responseObj;
    } else return null;
}