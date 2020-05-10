import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../core/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'recipes',
        loadChildren: () =>
          import('./recipes/recipes.module').then((m) => m.RecipesModule),
      },
      {
        path: 'shopping-list',
        loadChildren: () =>
          import('./shopping-list/shopping-list.module').then(
            (m) => m.ShoppingListModule
          ),
      },
      {
        path: '',
        redirectTo: 'recipes',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
