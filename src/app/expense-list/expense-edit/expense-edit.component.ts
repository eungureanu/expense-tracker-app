import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExpensesService } from '../../expenses.service';
import { Expense } from 'src/app/expenses.model';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.css']
})
export class ExpenseEditComponent {
  @ViewChild('f') expenseEdit: NgForm;
  currentDay: string;
  @Output() formSubmitted = new EventEmitter<void>();
  @Input() editedExpense: Expense;

  constructor(private route: ActivatedRoute, private expensesService: ExpensesService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentDay = params['day'];
      console.log("hey hey covrigei, this is the current day: ", this.currentDay);
      console.log("expense edit component has gone through init");
      console.log(this.expenseEdit);
      this.expenseEdit.form.value.category = this.editedExpense.category;
      this.expenseEdit.form.value.amount = this.editedExpense.amount;
    });
  }

  ngOnChanges(){
    console.log("expense edit component has gone through Changes");
  }

  ngOnDestroy(){
    console.log("expense edit component has gone through Destroy");
  }

  onSubmit(){
    console.log(this.expenseEdit);
    console.log("hey hey covrigei, this is the current day: ", this.currentDay);
    this.expensesService.addExpense(this.expenseEdit.form.value.category, +this.expenseEdit.form.value.amount, this.currentDay);
    this.expenseEdit.reset();
    this.formSubmitted.emit();
  }
}
