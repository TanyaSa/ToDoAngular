import { newArray } from '@angular/compiler/src/util';
import { Component } from '@angular/core';
import { access } from 'node:fs';
import { element } from 'protractor';
import { concat, from, interval, Observable, of } from 'rxjs';
import { reduce, filter, map, bufferCount, toArray, scan, delay, startWith, take, concatMap, concatAll } from 'rxjs/operators';

@Component({
    selector: 'app-test',
    template: '<button (click)="observ()">count!</button>',
    styleUrls: [],
})
export class TestComponent {

    // generalArr = [];

    // observ(): void {
    //     const arr = this.generateArr();
    //     console.log(arr);
    //     const source = from(arr).pipe(
    //         map(n => {
    //             let observable = Observable.of(n + 10);
    //             // we now have an observable here, not a number!
    //             return observable;
    //         })
    //     );
    //     // .pipe(delay(1000));



   generalArr = [];

    observ(): void {
        const arr = this.generateArr();
        console.log(arr);
        const source = from(arr).pipe(
            map(n => {
                return of(n).pipe(delay(1000)); // of - make a lot of observ elements from array anf get them delay
            }),
            concatAll()                     // make one general Observable from little ones and build them into the queue
        );

        source.pipe(
            map(e => e / 2),
            filter(e => (e % 1) === 0),
            scan((acc, curr) => {
                acc.push(curr);
                return acc;
            }, []),
            filter(e => e.length > 0), // !!e.length
            map(mass => mass.reduce((acc, curentElement) => acc + curentElement, 0) / mass.length)
        // tslint:disable-next-line: deprecation
        ).subscribe(
            val => console.log('summ:', val),
            err => console.error('error:', err),
            () => console.log('completed')
        );
    }

    sumArrays(arr): any {
        Array.prototype.push.apply(this.generalArr, arr);
        console.log('after-arr-', this.generalArr);
    }


    generateArr(): Array<number> {
        const testArr = [];
        for (let i = 0, t = 15; i < 15; i++) {
            testArr.push(Math.floor(Math.random() * t));
        }
        console.log(testArr);
        return testArr;

    }

    // observ(): void {
    //     const items = new Observable((subscriber) => {
    //         let arrayList = this.generateArr();
    //         console.log('1-' + arrayList);
    //         let newArr = [];
    //         arrayList.forEach(element => {
    //             newArr.push(Math.floor(element / 2));
    //         });
    //         console.log('2-' + newArr);
    //         subscriber.next(arrayList + 1);
    //         subscriber.next(arrayList + 12);
    //         subscriber.complete();
    //         // subscriber.error('ee');
    //     });
    //     items.subscribe({
    //         next(x) { console.log('got value ' + x); },
    //         error(err) { console.error('something wrong occurred: ' + err); },
    //         complete() { console.log('done'); }
    //     });
    // }


}



// const a = [1, 2];

// a.reduce((accamulator, curentElement) => accamulator + curentElement, 0);