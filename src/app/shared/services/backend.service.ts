import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, take, exhaustMap } from 'rxjs/operators';

import { RecipesService } from 'src/app/recipes/service/recipes.service';
import { environment } from 'src/environments/environment';
import { Recipe } from 'src/app/recipes/recipe.model';
import { ToastService } from 'src/app/toast/toast-service';
import { AuthService } from 'src/app/auth/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipesService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes().value;
    this.http
      .put(`${environment.rest_api}/recipes.json`, recipes)
      .subscribe((res) => {
        this.toastService.success('Recipe Saved successfully!');
      });
  }

  fetchRecipes() {
    return this.authService.user$.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Array<Recipe>>(
          `${environment.rest_api}recipes.json`,
          {
            params: new HttpParams().set('auth', user && user.token)
          }
        );
      }),
      tap((recipes) => {
        console.log(recipes);
        this.recipeService.setRecipe(recipes);
      })
    );
  }
}
