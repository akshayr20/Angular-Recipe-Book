import { Injectable } from '@angular/core';
import {
  CanActivate,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Observable, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<boolean> {
    return from(this.auth.authState).pipe(
      take(1),
      map((state) => !!state),
      tap((authenticated) => {
        if (!authenticated) {
          this.router.navigate(['/auth'], {
            queryParams: {
              returnUrl: routerState.url,
            },
          });
        }
      })
    );
  }
}
