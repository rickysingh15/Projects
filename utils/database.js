import axios from "axios";

const DB_URL = "https://expense-tracker-aa8b1-default-rtdb.firebaseio.com";


export async function storeExpense(token, expenseData)
{
    const response = await axios.post(DB_URL + "/expenses.json?auth=" + token, expenseData);
    const id = response.data.name; //firebase generates a unique id for the expense
    return id;
}

export async function fetchExpenses(token)
{
    console.log("fetching expenses with token: ", token);
    console.log("url is ", DB_URL + "/expenses.json?auth=" + token);
    const response = await axios.get(DB_URL + "/expenses.json?auth=" + token);
    console.log("response is ", response.data);

    const expenses = [];

    for(const key in response.data)
    {
        const expenseObj = {
            id: key,
            category: response.data[key].category,
            amount: response.data[key].amount,
            date: response.data[key].date,
            description: response.data[key].description            
        }
        expenses.push(expenseObj);
    }

    return expenses;
}

export async function updateExpenseDB(token, id, expenseData)
{
    return await axios.put(DB_URL + `/expenses/${id}.json?auth=${token}`, expenseData);
}

export async function deleteExpense(token, id)
{
    return await axios.delete(DB_URL + `/expenses/${id}.json?auth=${token}`);
}

export async function storeCategoryDB(token, categoryData)
{
    const response = await axios.post(DB_URL + "/categories.json?auth=" + token, categoryData);
    const id = response.data.name; //firebase generates a unique id for the category
    return id;
}

export async function fetchCategoriesDB(token)
{
    const response = await axios.get(DB_URL + "/categories.json?auth=" + token);
    const categories = [];

    for(const key in response.data)
    {
        const categoryObj = {
            id: key,
            title: response.data[key].title
        }
        categories.push(categoryObj);
    }
    return categories;
}

export async function deleteCategoryDB(token, id)
{
    return await axios.delete(DB_URL + `/categories/${id}.json?auth=${token}`);
}

export async function updateCategoryDB(token, id, categoryData)
{
    return await axios.put(DB_URL + `/categories/${id}.json?auth=${token}`, categoryData);
}