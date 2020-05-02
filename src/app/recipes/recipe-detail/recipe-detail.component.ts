import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../service/recipes.service';
import { Observable } from 'rxjs';

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
}
