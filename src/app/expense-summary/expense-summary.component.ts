import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpensesService } from '../expenses.service';
import { Expense } from '../expenses.model';

@Component({
  selector: 'app-expense-summary',
  templateUrl: './expense-summary.component.html',
  styleUrls: ['./expense-summary.component.css']
})
export class ExpenseSummaryComponent {
    
  constructor(private expensesService: ExpensesService){}

  days = this.expensesService.getDays();
  allExpenses = this.expensesService.getAllExpenses();
  expensesByDay: { day: string, expenses: Expense[] }[] = []; //an empty array to store expenses per day and iterate through it in the template
  weeklyTotal = this.expensesService.getWeeklyTotal();

  displayExpensesByDay() {
    this.expensesByDay = [];

    this.days.forEach(day => {
      const expensesForDay = this.allExpenses.filter(expense => expense.day === day);
      if (expensesForDay.length) {
        this.expensesByDay.push({ day: day, expenses: expensesForDay });
      }
    });
  }

  ngOnInit(){
    console.log("Summary component was initialised");
    this.displayExpensesByDay();
  }



}
