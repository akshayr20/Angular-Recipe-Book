import { Component, OnInit } from '@angular/core';
import { Ingredient } from './model/ingredient.model';
import { ShoppingListService } from './service/shopping-list.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  ingredients$: BehaviorSubject<Array<Ingredient>>;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients$ = this.shoppingListService.getIngredients();
  }

  onEditItem(index)  {
    this.shoppingListService.startedEditing$.next(index);
  }

}
