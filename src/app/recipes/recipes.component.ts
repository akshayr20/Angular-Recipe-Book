import { Component, OnInit } from '@angular/core';
import { BackendService } from '../shared/services/backend.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit{
  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.backendService.fetchRecipes().subscribe();
  }
}
