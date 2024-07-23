import { Component, Input } from '@angular/core';

export interface ListItem {
    id: number;
    displayName: string;
    done: boolean;
}
@Component({
    selector: 'app-list-item',
    standalone: true,
    imports: [],
    templateUrl: './list-item.component.html',
    styleUrl: './list-item.component.sass',
})
export class ListItemComponent {
    @Input() item?: ListItem;
}
