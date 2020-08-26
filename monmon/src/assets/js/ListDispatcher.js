import { defaulturl } from "./DispatcherGeneral";
const loginPrefix = "lists/login";
const logoutPrefix = "lists/logout";
const signUpPrefix = "lists/create";
const deleteUserPrefix = "lists/delete";
const changePasswordPrefix = "lists/changepassword";

export async function deleteList(authToken) {
  const url = defaulturl + deleteUserPrefix;
  if (authToken !== "") {
    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } else return null;
}

export async function changePassword(passwordChangeAttempt, authToken) {
  const url = defaulturl + changePasswordPrefix;
  if (passwordChangeAttempt !== "" && authToken !== "") {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordChangeAttempt),
    });
    return response;
  } else return null;
}

export async function login(loginRequest) {
  const url = defaulturl + loginPrefix;
  if (loginRequest != null || loginRequest !== undefined) {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    });

    return response;
  } else return null;
}

export async function logout(authToken) {
  if (authToken !== null) {
    const url = defaulturl + logoutPrefix;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } else return null;
}

export async function signUp(loginAttempt) {
  const url = defaulturl + signUpPrefix;
  if (loginAttempt != null || loginAttempt !== undefined) {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginAttempt),
    });
    return response;
  } else return null;
}
