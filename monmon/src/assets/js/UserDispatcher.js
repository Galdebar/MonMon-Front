import { defaulturl} from "./DispatcherGeneral";
const loginPrefix = "user/login";
const signUpPrefix = "user/register";
const deleteUserPrefix = "user/deleteuser";
const getLinkedUsersPrefix = "user/getlinkedusers";
const changeEmailPrefix = "user/changeemail";
const changePasswordPrefix = "user/changepassword";
const linkUserPrefix = "user/link";

export async function changeEmail(newEmail, authToken) {
  const url = defaulturl + changeEmailPrefix;
  if (newEmail !== "" && authToken !== "") {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmail),
    });
    return response;
  } else return null;
}

export async function deleteUser(authToken) {
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

export async function getLinkedUsers(authToken) {
  const url = defaulturl + getLinkedUsersPrefix;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });
  return response;
}

export async function linkUser(linkUserAttempt, authToken) {
  const url = defaulturl + linkUserPrefix;
  if (linkUserAttempt != null || linkUserAttempt !== undefined) {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(linkUserAttempt),
    });
    return response;
  } else return null;
}

export async function loginGithub() {
  const url =
    "https://github.com/login/oauth/authorize?client_id=b16e35c0b6c5ab110826";
  let response = await fetch(url);
  return response;
}
