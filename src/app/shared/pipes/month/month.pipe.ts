import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthCustom'
})
export class MonthCustomPipe implements PipeTransform {
constructor(private datePipe: DatePipe){}

  transform(date: string, ...args: unknown[]): string {
    const month = this.datePipe.transform(date, 'MMMM');
    console.log (month);
    return month;
  }

}
