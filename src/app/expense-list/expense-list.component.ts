import { Component, EventEmitter, Output } from '@angular/core';
import { Expense } from '../expenses.model';
import { ExpensesService } from '../expenses.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent {
  expensesList: Expense[] = [];
  day: string;
  nextDay: string | undefined;
  previousDay: string | undefined;
  dailyTotal: number;
  private subscriptionExpensesChanged: Subscription;
  showExpenseEdit: boolean = false;
  editedExpense: Expense;

  constructor(private expensesService: ExpensesService,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnInit() {
    console.log("expense list component has gone through Init");
    this.route.params.subscribe(
      (params: Params) => {
        this.day = params['day'];
        this.getDayData();
        console.log("current day in subscribe "+this.day);
        console.log("prev day in subscribe "+this.previousDay);
        console.log("next day in subscribe "+this.nextDay);

        // this.expensesService.setNextDay(this.day); //sends the route day to the service
        // this.expensesService.setPreviousDay(this.day); //sends the route day to the service

      }
    );
    this.subscriptionExpensesChanged = this.expensesService.expensesChanged.subscribe( //listens to changes on the expenses array
      () => {
        this.getDayData();
      }
    );
    console.log("day on init " + this.day);
    console.log(this.showExpenseEdit);

  }

  ngOnChanges(){
    console.log("expense list component has gone through Changes");
  }

  ngOnDestroy(){
    console.log("expense list component has gone through Destroy");
    this.subscriptionExpensesChanged.unsubscribe();
  }

  onNextDay(){
      this.nextDay = this.expensesService.getNextDay(this.day);
      // console.log("next day is "+this.nextDay);
      this.router.navigate(['../', this.nextDay]);
    }
  
  onPreviousDay(){
      this.previousDay = this.expensesService.getPreviousDay(this.day);
      // console.log("previous day is "+this.previousDay);
      this.router.navigate(['../', this.previousDay]);
    }

  getDayData(){
    this.expensesList = this.expensesService.getDailyExpenses(this.day);
    this.previousDay = this.expensesService.getPreviousDay(this.day);
    this.nextDay = this.expensesService.getNextDay(this.day);
    this.dailyTotal = this.expensesService.getDailyTotal(this.day);
  }

  toggleEdit(expenseItem: Expense){
    this.showExpenseEdit=!this.showExpenseEdit;
    console.log(expenseItem);
    this.editedExpense = expenseItem;
  }

}