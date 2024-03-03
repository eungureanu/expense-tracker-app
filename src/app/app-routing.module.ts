import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseListComponent } from './expense-list/expense-list.component';
// import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseSummaryComponent } from './expense-summary/expense-summary.component';

const routes: Routes = [
  { path: 'Summary', component: ExpenseSummaryComponent }, //place more specific routes higher up
  { path: ':day', component: ExpenseListComponent },
  { path: '', redirectTo: '/Monday', pathMatch: "full"},
  { path: '**', redirectTo: '/Monday' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
