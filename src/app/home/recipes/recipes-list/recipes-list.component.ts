import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../service/recipes.service';
import { AngularFireList } from '@angular/fire/database/database';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/service/auth.service';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
})
export class RecipesListComponent implements OnInit {
  recipes: Array<Recipe>;

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.authState().subscribe(() => {
      this.fetchRecipes();
    });
  }

  private fetchRecipes() {
    this.recipesService
      .fetchRecipes()
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => ({ key: a.payload.key, ...a.payload.val() }))
        )
      )
      .subscribe((recipes) => {
        this.recipes = recipes;
        console.log(this.recipes);
      });
  }

  goToCreateNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
