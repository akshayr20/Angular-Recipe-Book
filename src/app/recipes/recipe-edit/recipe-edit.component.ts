import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { RecipesService } from '../service/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  editMode = false;
  recipeIndex: number;
  recipeForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private recipeService: RecipesService
  ) {}

  ngOnInit(): void {
    let recipe: Recipe = {
      name: '',
      description: '',
      imagePath: '',
      ingredients: [],
    };
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.editMode = true;
        this.recipeIndex = +params.id;
        recipe = this.recipeService.getRecipe(this.recipeIndex);
      }
      this.initForm(recipe);
    });
  }

  private initForm(recipe: Recipe) {
    const recipeIngredients = new FormArray([]);
    for (const ingredient of recipe.ingredients) {
      recipeIngredients.push(
        new FormGroup({
          name: new FormControl(ingredient.name, [Validators.required]),
          amount: new FormControl(ingredient.amount, [Validators.required]),
        })
      );
    }

    this.recipeForm = this.fb.group({
      name: [recipe.name, [Validators.required]],
      imagePath: [recipe.imagePath, [Validators.required]],
      description: [recipe.description, [Validators.required]],
      ingredients: recipeIngredients,
    });
  }

  addIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl(1),
      })
    );
  }

  onDeleteIngredient(index) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  get ingredientsCtrl() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      if (this.editMode) {
        this.recipeService.updateRecipe(
          this.recipeIndex,
          this.recipeForm.value
        );
      } else {
        this.recipeService.addRecipe(this.recipeForm.value);
      }
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}
