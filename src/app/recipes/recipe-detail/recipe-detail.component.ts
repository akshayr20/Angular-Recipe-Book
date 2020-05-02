import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../service/recipes.service';
import { Observable } from 'rxjs';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe$: Observable<Recipe>;

  constructor(private recipeService: RecipesService) {}

  ngOnInit() {
    this.selectedRecipe$ = this.recipeService.recipeSelected$;
  }

  onAddToShoppingList(ingredients: Array<Ingredient>) {
    this.recipeService.addIngredientsToShoppingList(ingredients);
  }
}
