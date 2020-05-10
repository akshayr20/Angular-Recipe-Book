import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  collapsed = true;
  navCollapsed = true;
  isAuthenticated = false;
  constructor(private authService: AuthService) {}

  saveData() {
    // this.backendService.storeRecipes();
  }

  fetchData() {
    // this.backendService.fetchRecipes().subscribe(res =>  {
    //   console.log(res);
    // });
  }

  logout() {
    this.authService.logout();
  }
}
