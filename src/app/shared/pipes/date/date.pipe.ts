import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateCustom'
})
export class DateCustomPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) { }

  transform(date: Date, ...args: unknown[]): string {
    const weekdayString = this.datePipe.transform(date, 'EEEE');
    const dateString = this.datePipe.transform(date, 'd');
    let dateSuffix = 'th';
    console.log (date.getDate());

    switch (date.getDate()) {
      case 1: {
        dateSuffix = 'st';
        break;
      }
      case 2: {
        dateSuffix = 'nd';
        break;
      }
      case 3: {
        dateSuffix = 'rd';
        break;
      }
    }

    return weekdayString + ', ' + dateString + dateSuffix;
  }

}
