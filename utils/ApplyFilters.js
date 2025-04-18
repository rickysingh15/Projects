export function ApplyFilters(expenses, period, duration)
{
    const today = new Date();
    console.log("today is ", today);
    console.log("period is ", period);
    console.log("duration is ", duration);

    return expenses.filter((expense) => {

        console.log("expense id is ", expense.id);
        const expenseDate = new Date(expense.date);
        console.log("expense date is ", expenseDate);

        if (period === 'day') {
            const durationInMs = duration * 24 * 60 * 60 * 1000; // Convert days to milliseconds
            const startDate = new Date(today.getTime() - durationInMs);
            // console.log("start date is ", startDate);
            console.log("result is ", expenseDate >= startDate && expenseDate <= today);
            return expenseDate >= startDate && expenseDate <= today;
        } else if (period === 'month') {
            const startMonth = today.getMonth() - duration;
            const startDate = new Date(today.getFullYear(), startMonth, today.getDate());
            // console.log("start date is ", startDate);
            console.log("result is ", expenseDate >= startDate && expenseDate <= today);
            return expenseDate >= startDate && expenseDate <= today;
        } else if (period === 'year') {
            const startYear = today.getFullYear() - duration;
            const startDate = new Date(startYear, today.getMonth(), today.getDate());
            // console.log("start date is ", startDate);
            console.log("result is ", expenseDate >= startDate && expenseDate <= today);
            return expenseDate >= startDate && expenseDate <= today;
        }

        // If no valid period is provided, return all expenses
        return true;
    });
}
