import { Component, OnInit, Input } from '@angular/core';

import {
  CollectionComponent, TabItemInterface
} from '../collection/collection.component';

@Component({
  selector: 'app-tabs-item',
  templateUrl: './item.component.html',
  styles: []
})
export class ItemComponent implements OnInit, TabItemInterface {
  selected = false;
  @Input() title: string;
  @Input() name: string;
  @Input() disabled = false;

  constructor(
    private collection: CollectionComponent
  ) {}

  ngOnInit() {
    this.collection.addItem(this);
  }
}
