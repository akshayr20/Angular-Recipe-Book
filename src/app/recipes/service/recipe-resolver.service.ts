import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from '../recipe.model';
import { BackendService } from 'src/app/shared/services/backend.service';
import { RecipesService } from './recipes.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolverService implements Resolve<Array<Recipe>> {
  constructor(
    private backendService: BackendService,
    private recipeService: RecipesService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes().value;
    if (recipes.length === 0) {
      return this.backendService.fetchRecipes();
    }
    return recipes;
  }
}
