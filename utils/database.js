import axios from "axios";

const DB_URL = "https://expense-tracker-aa8b1-default-rtd.firebaseio.com";


export async function storeExpense(expenseData)
{
    const response = await axios.post(DB_URL + "/expenses.json", expenseData);
    const id = response.data.name; //firebase generates a unique id for the expense
    return id;
}

export async function fetchExpenses()
{
    const response = await axios.get(DB_URL + "/expenses.json");

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

export async function updateExpenseDB(id, expenseData)
{
    return await axios.put(DB_URL + `/expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id)
{
    return await axios.delete(DB_URL + `/expenses/${id}.json`);
}