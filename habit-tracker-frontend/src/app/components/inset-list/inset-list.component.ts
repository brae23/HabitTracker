import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListItem } from 'src/app/interfaces/list-item';
import { TaskList } from 'src/app/interfaces/task-list';

@Component({
  selector: 'app-inset-list',
  templateUrl: './inset-list.component.html',
  styleUrls: ['./inset-list.component.scss'],
})
export class InsetListComponent  implements OnInit {

  @Input() taskList: TaskList;
  @Output() listItemClicked: EventEmitter<ListItem>;

  constructor() { }

  ngOnInit() {}

  listItemClickedEvent(listItem: ListItem) {
    this.listItemClicked.emit(listItem);
  }

}
