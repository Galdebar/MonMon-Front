const defaulturl = "http://localhost:8080/";
const shoppingItemsPath = "shoppingitems/";


export async function getAllShoppingItems(){
    const url = defaulturl + shoppingItemsPath + "getAll";
    let response = await fetch(url);
    let responseArray = await response.json();
    return responseArray;
}

export async function getShoppingItemCategories(){
    const url = defaulturl + "getShoppingItemCategories";
    let response = await fetch(url);
    let responseObj = await response.json();
    return responseObj;
}

export async function updateItem(shoppingItemDTO){
    const url = defaulturl + shoppingItemsPath + `{id=${shoppingItemDTO.id}`;
    let response = await fetch(url,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shoppingItemDTO)
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