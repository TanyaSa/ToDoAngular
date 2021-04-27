import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemService } from '../services/item.service';
import { ListType } from './list.type';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ItemComponent {
    dataSource: Observable<Array<ListType>> = this.itemService.dataSource;
    placeholderTest = 'Enter description here...';
    displayedColumns = ['select', 'description', 'time', 'actions'];
    constructor(private itemService: ItemService) { }

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
