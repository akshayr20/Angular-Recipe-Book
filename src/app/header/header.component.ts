import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { BackendService } from '../shared/services/backend.service';
import { AuthService } from '../auth/service/auth.service';
import { Observable } from 'rxjs';
import { User } from '../auth/model/auth.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  navCollapsed = true;
  isAuthenticated = false;
  constructor(
    private backendService: BackendService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  saveData() {
    this.backendService.storeRecipes();
  }

  fetchData() {
    this.backendService.fetchRecipes().subscribe(res =>  {
      console.log(res);
    });
  }
}
