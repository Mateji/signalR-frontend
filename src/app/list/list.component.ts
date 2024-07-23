import { Component } from '@angular/core';
import { ListItem, ListItemComponent } from '../list-item/list-item.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [ListItemComponent, NgFor],
    templateUrl: './list.component.html',
    styleUrl: './list.component.sass',
})
export class ListComponent {
    items: ListItem[] = [
        { id: 1, displayName: 'Buy milk', done: false },
        { id: 2, displayName: 'Buy eggs', done: true },
        { id: 3, displayName: 'Buy bread', done: false },
    ];
}
