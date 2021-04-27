import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListType } from '../list/list.type';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private _dataSource = new BehaviorSubject<Array<ListType>>([]);

    constructor() { }

    dataSource: Observable<Array<ListType>> = this._dataSource.asObservable();

    getTime(): string {
        const creationTime = '10PM';
        return creationTime;
    }

    updateCheckbox(item: ListType): void {
        item.isChecked = !item.isChecked;
    }

    updateItem(item: ListType): void {
        let itemsArray = this._dataSource.value;
        console.log(item);
        const updatedItem = itemsArray.find(el => el.name === item.name);
        const itemIndex = itemsArray.indexOf(updatedItem);
        itemsArray = itemsArray.splice(itemIndex, 1, item);
        this._dataSource.next(itemsArray);
        console.log(itemsArray);
        // alert(`${itemsArray} saved successfully!`);
    }

    addNewItem(): void {
        const itemsArray = this._dataSource.value;
        itemsArray.push(new ListType());
        this._dataSource.next(itemsArray);
    }

    removeItem(item: ListType): void {
        let itemsArray = this._dataSource.value;
        itemsArray = itemsArray.filter(el => el !== item);
        this._dataSource.next(itemsArray);
    }
}
