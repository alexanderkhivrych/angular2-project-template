import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styles: []
})
export class ConfirmationComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public openConfirmationPopup() {
    this.router.navigate([this.router.url], {fragment: 'confirm', relativeTo: this.route});
  }

  ngOnInit() {
  }
}
