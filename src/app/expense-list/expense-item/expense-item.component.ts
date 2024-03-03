import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Expense } from 'src/app/expenses.model';
import { ExpensesService } from 'src/app/expenses.service';

@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.css']
})
export class ExpenseItemComponent {
  @Input() expenseItem: Expense;
  @Output() editClicked = new EventEmitter<Expense>();

  constructor(private expensesService: ExpensesService){}

  ngOnInit(){
    console.log("expense item component has gone through Init");
  }

  ngOnChanges(){
    console.log("expense item component has gone through Changes");
  }

  ngOnDestroy(){
    console.log("expense item component has gone through Destroy");
  }

  onDelete(){
    this.expensesService.deleteExpense(this.expenseItem.id); //sends the id of the expense item where the delete button was clicked
    // console.log("expense id = "+this.expenseItem.id);
  }

  onEdit(){
    console.log("Edit button was clicked");
    this.editClicked.emit(this.expenseItem);
    console.log("expense: ", this.expenseItem);

  }

}
