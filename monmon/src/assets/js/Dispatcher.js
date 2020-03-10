const defaulturl = "http://localhost:8080/";
const shoppingItemsPath = "shoppingitems/";
const categorySearchPath = "categorysearch/";
const searchPrefix = "?search=";
const loginPrefix = "user/login";
const signUpPrefix = "user/signup";

export async function getAllShoppingItems(authToken) {
    const url = defaulturl + shoppingItemsPath + "getAll";
    let response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${authToken}`,
        }
    });
    return await checkResponse(response);
}

export async function getShoppingItemCategories(authToken) {
    const url = defaulturl + categorySearchPath + "getall";
    let response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${authToken}`,
        }
    });
    return await checkResponse(response);
}

export async function updateItem(shoppingItemDTO, authToken) {
    const url = defaulturl + shoppingItemsPath + `{id=${shoppingItemDTO.id}`;
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
    const url = defaulturl + shoppingItemsPath + "updateItems";
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
    const url = defaulturl + shoppingItemsPath + `{id=${shoppingItemDTO.id}`;
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
    const url = defaulturl + shoppingItemsPath + "deleteItems";
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

export async function addItem(shoppingItemDTO, authToken) {
    const url = defaulturl + shoppingItemsPath;
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

export async function search(searchString, authToken) {
    const url = defaulturl + categorySearchPath + searchPrefix + searchString;
    if (searchString !== "") {
        const searchObject = {
            shoppingItemCategory: "",
            keyword: searchString
        };
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(searchObject)
        });
        return await checkResponse(response);
    }
}

export async function login(loginRequest) {
    const url = defaulturl + loginPrefix;
    if (loginRequest != null || loginRequest !== undefined) {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginRequest)
        });

        return await checkResponse(response);
    } else return null;
}

export async function signUp(loginAttempt){
    const url = defaulturl + signUpPrefix;
    if(loginAttempt != null || loginAttempt !== undefined){
        let response = await fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginAttempt)
        });
        return await response.text();
    } else return null;
}

export async function loginGithub(){
    const url = "https://github.com/login/oauth/authorize?client_id=b16e35c0b6c5ab110826";
    let response = await fetch(url);
    return await checkResponse(response)
}


async function checkResponse(response) {
    if (response.ok) {
        return await response.json();
    } else return null;
}