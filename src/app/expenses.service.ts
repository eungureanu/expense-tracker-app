import { Injectable } from "@angular/core";
import { Expense } from "./expenses.model";
import { Subject } from "rxjs";

@Injectable() export class ExpensesService {
    
    // nextDayChanged = new Subject<string>();
    // previousDayChanged = new Subject<string>();
    expensesChanged = new Subject<Expense[]>(); //"expensesChanged" referes more to true/false, maybe rename; 
    //could be replaced by async pipe
    //new feature: signals

    private expenses: Expense[] =[
        new Expense("Medicine", 56, "Monday"),
        new Expense("Concert ticket", 32, "Monday"),
        new Expense("Cake", 27, "Tuesday"),
        new Expense("Movie", 32, "Wednesday"),
        new Expense("Jacket", 113, "Wednesday"),
        new Expense("Juice", 23, "Thursday"),
        new Expense("Food", 100, "Thursday"),
        new Expense("Food", 76, "Friday")
    ]

    private days: Array<string> = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    getWeeklyTotal(){
        let amounts: number[] = [];
        this.expenses.forEach((element) => amounts=amounts.concat(element.amount));
        return amounts.reduce((accumulator:number, currentValue:number) => accumulator + currentValue, 0);
    }

    getDailyTotal(currentDay: string){
        let amounts: number[] = [];
        this.getDailyExpenses(currentDay).forEach((element) => amounts=amounts.concat(element.amount));
        return amounts.reduce((accumulator:number, currentValue:number) => accumulator + currentValue, 0);
    }

    getDays(){
        return this.days.slice();
    }

    getAllExpenses(){
          return this.expenses.slice();
    }

    getDailyExpenses(currentDay: string){
        for (let i=0; i<this.expenses.length; i++){ //adds an id to the existing objects, used by the delete function
            this.expenses[i].id=i;
        }
        return this.expenses.filter((expense) => expense.day === currentDay);
    }

    //used by expense-list to get the next day compared to active route day
    getNextDay(currentDay: string): string | undefined {
        const currentIndex = this.days.findIndex((element) => element === currentDay);
        const nextIndex = currentIndex + 1;
        return this.days[nextIndex];
    }

    // //used by expenses to listen for the next day
    // setNextDay(currentDay: string){
    //     const nextDay = this.getNextDay(currentDay);
    //     this.nextDayChanged.next(nextDay); //emits an event with the next day
    // }

    //used by expense-list to get the previous day compared to active route day
    getPreviousDay(currentDay: string){
        const currentIndex = this.days.findIndex((element) => element === currentDay);
        const previousIndex = currentIndex - 1;
        return this.days[previousIndex];
    }
    
    // //used by expenses to listen for the previous day
    // setPreviousDay(currentDay: string){
    //     const previousDay = this.getPreviousDay(currentDay);
    //     this.previousDayChanged.next(previousDay); //emits an event with the next day
    // }

    addExpense(category: string, amount: number, day: string){
        const newExpense = new Expense(category, amount, day);
        this.expenses.push(newExpense);
        console.log(this.expenses);
        this.expensesChanged.next(this.expenses); //emits an event with the new (updated) expenses array

    }

    deleteExpense(id: number){ //deletes the expense object with the id sent by the expense item onDelete method
        const indexOfObjectToDelete = this.expenses.findIndex((element) => element.id === id);
        this.expenses.splice(indexOfObjectToDelete,1);
        console.log(this.expenses);
        this.expensesChanged.next(this.expenses); //emits an event with the new (updated) expenses array
    }
}