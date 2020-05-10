import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../service/recipes.service';
import { Ingredient } from 'src/app/shopping-list/model/ingredient.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;
  selectedRecipeId: number;
  constructor(
    private recipeService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.selectedRecipeId = +params.id;
      // this.selectedRecipe = this.recipeService.getRecipe(this.selectedRecipeId);
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
