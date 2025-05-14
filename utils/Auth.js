import axios from "axios"

const API_KEY = "AIzaSyCoL9MI89m6efN2l4OtjUi7lIVNXc5t-uQ"
const SIGNUP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
const LOGIN_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="

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
    return token;
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
    return token;
    // console.log("response is ", response.data)
}