const defaultUrl = "http://localhost:8080/shoppingitems";

document.querySelector("form").addEventListener("submit", event =>{
    event.preventDefault();

    const receivedName = document.getElementById("item-name").value;

    const jsonData = {itemName:receivedName};

    postItem(jsonData);
});

function postItem(item){

    fetch(defaultUrl, {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(item)
    });

    console.log(item);

}

document.getElementById("get-btn").addEventListener("click", getAll);

function getAll(){
    const url = "localhost:8080/shoppingitems/getAll";
    let responseObj;
    fetch(url)
        .then(resp => resp.JSON)
        .then(data => responseObj = data);
}