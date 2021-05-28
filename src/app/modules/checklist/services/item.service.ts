import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListType } from '../list/list.type';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private _dataSource = new BehaviorSubject<Array<ListType>>([]);
    listUrl = '/rest/checklist';

    constructor(private http: HttpClient, private authService: AuthService) { }

    dataSource: Observable<Array<ListType>> = this._dataSource.asObservable();

    getTime(): string {
        const creationTime = '10PM';
        return creationTime;
    }

    updateCheckbox(item: ListType): void {
        item.isCompleted = !item.isCompleted;
    }

    updateItem(item: ListType): void {
        const ur = environment.host + this.listUrl + `/${item._id}`;
        const body = { title: item.title, isCompleted: item.isCompleted };
        console.log('item:');
        console.log(item);

        this.http.put<ListType>(ur, body, { headers: { 'x-auth-token': this.authService.token }, responseType: 'json' })
            .subscribe((updatedReturnedItem: ListType) => {
                const items = this._dataSource.value;

                const updatedItem = items.find(el => el._id === updatedReturnedItem._id);
                const itemIndex = items.indexOf(updatedItem);
                items.splice(itemIndex, 1, item);
                this._dataSource.next(items);
            });
    }

    addNewItem(): Observable<Array<ListType>> {
        const ur = environment.host + this.listUrl;
        this.http.post<ListType>(ur, { headers: { 'x-auth-token': this.authService.token }, responseType: 'json' })
            .subscribe((item: ListType) => {
                const items = this._dataSource.value;
                items.push(item);
                this._dataSource.next(items);
            });
        return this._dataSource.asObservable();
    }

    removeItem(item: ListType): void {
        const ur = environment.host + this.listUrl + `/${item._id}`;
        this.http.delete<ListType>(ur, { responseType: 'json' })
            .subscribe(() => {
                let items = this._dataSource.value;
                items = items.filter(el => el._id !== item._id);
                this._dataSource.next(items);
            });
    }


    getChecklist(): Observable<Array<ListType>> {
        const a = environment.host + this.listUrl;
        this.http.get<Array<ListType>>(a, { responseType: 'json' })
            .subscribe((items: Array<ListType>) => { // we cannot change, only subscribe
                this._dataSource.next(items); // write items into _dataSource
            });

        return this._dataSource.asObservable(); // return like dataSource
    }
}

// class PaginationPage<T> {
//     items: T[];
//     count: number;
// }

// get<T>(params: any): Observable<T>;

// get<User>();

// const resp = new PaginationPage<User>();
// const resp2 = new PaginationPage<Item>();


// class PaginationPageUsers {
//     items: User[];
//     count: number;
// }

// class PaginationPageItems {
//     items: Item[];
//     count: number;
// }
