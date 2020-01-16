import { Component, OnInit } from '@angular/core';
import { of, Observable, Observer, timer } from 'rxjs';
import { map, filter, delay } from 'rxjs/operators';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {
  currentTime$: Observable<Date>;

  // numbers: Observable<number> = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
  //   .pipe(
  //     filter(x => x > 2),
  //     map(x => 10 * x),
  //     // delay(3000)
  //   );

  constructor() { }

  ngOnInit() {
    this.currentTime$ = timer(0, 1000).pipe(map(() => new Date()));

    const observable2 = Observable.create((observer: Observer<number>) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    });

    observable2.subscribe(
      (value) => console.log('new value:', value),
      (error) => console.log('error', error),
      () => console.log('completed succesfully')
    );
  }
}
