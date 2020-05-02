import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RecipesService } from './recipes/service/recipes.service';
import { ShoppingListService } from './shopping-list/service/shopping-list.service';
import { ToastService } from './toast/toast-service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipes-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ToastsContainer } from './toast/toasts-container.component';
import { DropwdownDirective } from './shared/directives/dropwdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipesListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    ToastsContainer,
    DropwdownDirective,
  ],
  imports: [BrowserModule, FormsModule, NgbModule],
  providers: [ToastService, RecipesService, ShoppingListService],
  bootstrap: [AppComponent],
})
export class AppModule {}
