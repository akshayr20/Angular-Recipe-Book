import { Component } from '@angular/core';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent {
  selectedRecipe$: Subject<Recipe> = new Subject();
  constructor() {}
}
