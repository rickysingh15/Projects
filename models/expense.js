
import Category from "./category";

class Expense {
    constructor(id, category, amount, date, description) {
      this.id = id;
      this.category = category;
      this.amount = amount;
      this.date = date;
      this.description = description;
    }
  }
  
  export default Expense;