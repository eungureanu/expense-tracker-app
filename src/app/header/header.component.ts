import { Component } from '@angular/core';
import { ExpensesService } from '../expenses.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  days: Array<string>;
  constructor(private expensesService: ExpensesService){}
  
  ngOnInit(){
    this.days = this.expensesService.getDays()
  }

}
