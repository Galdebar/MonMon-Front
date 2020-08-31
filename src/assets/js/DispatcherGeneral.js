export const defaulturl = process.env.VUE_APP_BACK_URL;

export async function checkResponse(response) {
    if (response.ok) {
        return await response.json();
    } else return null;
}