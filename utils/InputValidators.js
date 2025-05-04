export function InputValidators(amount, description)
{
    const amountIsValid = !isNaN(amount) && amount > 0 && amount.length > 0;
    const descriptionIsValid = description.trim().length > 0;

    return [amountIsValid, descriptionIsValid];
}