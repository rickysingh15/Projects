import axios from "axios"

const API_KEY = "AIzaSyCoL9MI89m6efN2l4OtjUi7lIVNXc5t-uQ"
const SIGNUP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
const LOGIN_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
const REFRESH_URL = "https://securetoken.googleapis.com/v1/token?key="

export async function createUser(email, password)
{
    const response = await axios.post(SIGNUP_URL + API_KEY,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
    );

    const token = response.data.idToken;
    const refreshToken = response.data.refreshToken;
    return { token, refreshToken };
}

export async function login(email, password)
{
    const response = await axios.post(LOGIN_URL + API_KEY,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
    );

    const token = response.data.idToken;
    const refreshToken = response.data.refreshToken;
    return { token, refreshToken };
}

export async function refresh(rToken)
{
    const response = await axios.post(REFRESH_URL + API_KEY,
        {
            grant_type: "refresh_token",
            refresh_token: rToken
        }
    );

    console.log("Response from refresh token: ", response.data);

    const token = response.data.id_token;
    const refreshToken = response.data.refresh_token;
    return { token, refreshToken };
}