import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { ItemService } from '../services/item.service';
import { ListType } from './list.type';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ItemComponent implements OnInit {
    dataSource: Observable<Array<ListType>> = this.itemService.dataSource;
    placeholderTest = 'Enter description here...';
    displayedColumns = ['select', 'description', 'time', 'actions'];
    email = 'abc';
    password = '123';
    lists: ListType;

    constructor(private itemService: ItemService, private authService: AuthService) { }

    ngOnInit(): void {
        console.log('ngOnInit');
        this.itemService.getChecklist();
    }

    get isAdmin(): boolean {
        console.log('isadmin');
        return this.authService.isAdmin;
    }

    getTime(): string {
        const creationTime = '10PM';
        return creationTime;
    }

    getChecked(item: ListType): void {
        this.itemService.updateCheckbox(item);
    }

    updateItem(item: ListType): void {
        this.itemService.updateItem(item);
    }

    addNewItem(): void {
        this.itemService.addNewItem();
    }

    removeItem(item: ListType): void {
        this.itemService.removeItem(item);
    }
}
