import { Component, OnInit } from '@angular/core';


var orders = [
  { amount: 1 },
  { amount: 2 },
  { amount: 3 },
  { amount: 4 },
  { amount: 5 },
];

var totalAmount = orders.reduce((sum, order) => {
  // console.log('reduce', sum, 'obj', order)
  return sum + order.amount
}, 0);

var totalForLoop = () => {
  let sum = 0;
  for(let i = 0; i < orders.length; i++) {
    // console.log('for loop', sum);
    sum += orders[i].amount;
  }
  return sum;
}

@Component({
  selector: 'app-reduce',
  templateUrl: './reduce.component.html',
  styleUrls: ['./reduce.component.scss']
})
export class ReduceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
/*     console.log(totalAmount);
    console.log(totalForLoop()); */
  }

}
