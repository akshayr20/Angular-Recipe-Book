import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../service/recipes.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
})
export class RecipesListComponent implements OnInit {
  recipes: Array<Recipe>;

  constructor(private recipesService: RecipesService, private router: Router) {}

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
  }

}
