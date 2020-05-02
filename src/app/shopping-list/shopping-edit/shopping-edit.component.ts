import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f', { static: true }) shoppingForm: NgForm;

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.shoppingForm.valid) {
      console.log(this.shoppingForm.value);
    }
  }
}
