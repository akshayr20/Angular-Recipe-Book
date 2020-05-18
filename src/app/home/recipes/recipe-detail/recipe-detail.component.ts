import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../service/recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from '../../shopping-list/model/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;
  selectedRecipeKey: string;
  constructor(
    private recipeService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.selectedRecipeKey = params.key;
      setTimeout(() => {
        this.recipeService.getRecipeByKey(this.selectedRecipeKey);
        console.log(this.selectedRecipe);
      }, 2000);
    });
  }

  onAddToShoppingList(ingredients: Array<Ingredient>) {
    // this.recipeService.addIngredientsToShoppingList(ingredients);
  }

  deleteRecipe()  {
    // this.recipeService.deleteRecipe(this.selectedRecipeId);
    this.router.navigate(['/']);
  }
}
