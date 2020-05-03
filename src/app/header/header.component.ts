import { Component, Output, EventEmitter } from '@angular/core';
import { BackendService } from '../shared/services/backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  collapsed = true;
  navCollapsed = true;
  constructor(private backendService: BackendService) {}

  saveData() {
    this.backendService.storeRecipes();
  }

  fetchData() {
    this.backendService.fetchRecipes();
  }
}
