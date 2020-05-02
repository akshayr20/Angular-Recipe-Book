import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../service/recipes.service';
import { Observable } from 'rxjs';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;
  id: number;
  constructor(
    private recipeService: RecipesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.selectedRecipe = this.recipeService.getRecipe(this.id);
    });
  }

  onAddToShoppingList(ingredients: Array<Ingredient>) {
    this.recipeService.addIngredientsToShoppingList(ingredients);
  }
}
