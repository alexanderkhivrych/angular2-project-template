import {
  Component, OnInit, EventEmitter, Output, Input
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

export interface TabItemInterface {
  title: string;
  name: string;
  selected: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'app-tabs-collection',
  templateUrl: './collection.component.html',
  styles: []
})
export class CollectionComponent implements OnInit {
  public tabs: TabItemInterface[] = [];
  public current: TabItemInterface;
  private fragment: string;

  @Output() selected = new EventEmitter();
  @Input() navigation: string;
  @Input() name: string;
  @Input() headingCss: string;
  @Input() contentCss: string;

  addItem(tab: TabItemInterface) {
    if (!tab.disabled) {
      if (this.current == null) {
        tab.selected = true;
        this.current = tab;
      } else if (tab.name === this.fragment) {
        this.current.selected = false;
        tab.selected = true;
        this.current = tab;
      }
    }
    this.tabs.push(tab);
  }

  selectItem(evt, tab: TabItemInterface) {
    if (evt && 'preventDefault' in evt) {
      evt.preventDefault();
    }
    if (tab.disabled) {
      return false;
    }
    this.tabs.map((_tab) => {
      _tab.selected = false;
    });
    tab.selected = true;
    this.current = tab;
    switch (this.navigation) {
      case 'params':
        const params = {};
        if (this.name != null) {
          params[this.name] = tab.name;
        }
        this.router.navigate([], { queryParams: params, relativeTo: this.route });
        break;
      case 'fragment':
        this.router.navigate([], { fragment: tab.name, relativeTo: this.route });
        break;
      default:
        break;
    }
    this.selected.emit({selected: tab});
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  private watchFragmentUpdate() {
    this.route.fragment.subscribe((fragment) => {
      this.fragment = fragment;
      if (this.tabs.length > 0) {
        for (let i = this.tabs.length - 1; i >= 0; i--) {
          if (this.tabs[i].name === this.fragment) {
            if (!this.tabs[i].selected) {
              this.selectItem(null, this.tabs[i]);
            }
          }
        }
      }
    });
  }

  private watchParamsUpdate() {
    this.route.queryParams.subscribe((params) => {
      this.fragment = params[this.name];
      if (this.tabs.length > 0) {
        for (let i = this.tabs.length - 1; i >= 0; i--) {
          if (this.tabs[i].name === this.fragment) {
            if (!this.tabs[i].selected) {
              this.selectItem(null, this.tabs[i]);
            }
          }
        }
      }
    });
  }

  ngOnInit() {
    switch (this.navigation) {
      case 'params':
        if (this.name != null) {
          this.watchParamsUpdate();
        }
        break;
      case 'fragment':
        this.watchFragmentUpdate();
        break;
      default:
        break;
    }
  }
}
