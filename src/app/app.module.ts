import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ExpenseItemComponent } from './expense-list/expense-item/expense-item.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpensesService } from './expenses.service';
import { ExpenseSummaryComponent } from './expense-summary/expense-summary.component';
import { ExpenseEditComponent } from './expense-list/expense-edit/expense-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ExpenseItemComponent,
    ExpenseListComponent,
    ExpenseSummaryComponent,
    ExpenseEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ExpensesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
