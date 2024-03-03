export class Expense {
    public category: string; //try to use enum, to know what to expect as categories; or a custom type; 
    public amount: number;
    public day: string;
    public id: number;


    constructor(expense_category:string, expense_amount: number, expense_day: string, expense_id?: number){
        this.category = expense_category;
        this.amount = expense_amount;
        this.day = expense_day;
        this.id = expense_id;
    }
}