// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  rest_api: 'https://recipe-ingredients-shopping.firebaseio.com/',
  auth: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAy4ROm6uVhAm7gqtQk7_0M6QepnJSQVLY`,
  login:
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAy4ROm6uVhAm7gqtQk7_0M6QepnJSQVLY',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
