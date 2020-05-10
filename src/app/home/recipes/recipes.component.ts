import { Component } from '@angular/core';

@Component({
  selector: 'app-recipes',
  template: `
    <div class="row">
      <app-recipes-list class="col-md-6"></app-recipes-list>
      <div class="col-md-6">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class RecipesComponent {}
