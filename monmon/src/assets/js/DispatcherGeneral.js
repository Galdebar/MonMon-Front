export const defaulturl = "http://localhost:8080/";

export async function checkResponse(response) {
    if (response.ok) {
        return await response.json();
    } else return null;
}