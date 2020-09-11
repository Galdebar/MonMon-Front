import { defaulturl } from "./DispatcherGeneral";
const dealsPath = "deals/";
const attachSingleItemPrefix = "attach/";
const attachMultipleItemsPrefix = attachSingleItemPrefix + "all";

export async function attachDealToShoppingItem(shoppingItemDTO) {
  const url = defaulturl + dealsPath + attachSingleItemPrefix;
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shoppingItemDTO),
  });
  return response;
}

export async function attachDealsToShoppingItems(itemsArray) {
  const url = defaulturl + dealsPath + attachMultipleItemsPrefix;
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemsArray),
  });
  return response;
}
