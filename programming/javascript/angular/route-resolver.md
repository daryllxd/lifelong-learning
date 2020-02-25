# Angular Router: Route Resolvers
[Reference](https://alligator.io/angular/route-resolvers/)

- Route resolver: Get data before navigating to the new route.

```
import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class HnResolver implements Resolve<Observable<string>> {
  constructor() {}

  resolve() {
    return Observable.of('Hello Alligator!').delay(2000);
  }
}
```

- The only requirement to implement Angular router's `Resolve` interface is that the class has a `resolve` method. Whatever is returned from that method will be the resolved data.
- Now, we can setup our routing module to include our resolver.

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopComponent } from './top/top.component';
import { HomeComponent } from './home/home.component';

import { HnResolver } from './hn.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'top',
    component: TopComponent,
    resolve: { message: HnResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    HnResolver
  ]
})
export class AppRoutingModule {}
```

- Resolver: Is provided just like a service, and then we include the resolver with our route definition. Here, the resolved data will be available under the `message` key.
- To access the resolved data, we can use the `data` property of Activated Route's `snapshot` object:

```
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({ ... })
export class TopComponent implements OnInit {
  data: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.data = this.route.snapshot.data;
  }
}
```

- And then, we can access the message via `data.message` in the component.
- Error handling: In case there's an error while fetching the data, you can use RxJS's `catch` operator.

```
import { Injectable } from '@angular/core';
import { HnService } from './hn.service';

import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class HnResolver implements Resolve<any> {
  constructor(private hnService: HnService) {}

  resolve() {
    return this.hnService.getTopPosts().catch(() => {
      return Observable.of('data not available at this time');
    });
  }
}
```

- Or you can return an empty observable:

```
resolve() {
  return this.hnService.getTopPosts().catch(() => {
    return Observable.empty();
  });
}
```

# Understanding Angular Route Resolvers
[Reference](https://dzone.com/articles/understanding-angular-route-resolvers-by-example)

- Resolver acts like middleware, which can be executed before a component is loaded.
- *Angular's Route Resolver class will fetch your data before the component is ready. Your conditional statements will work smoothly with the Resolver.*

```
export interface Resolve<T> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T {
  return 'Data resolved here...'
  }
}
```

- `resolve` function:
  - First parameter: the current route you have.
  - Second parameter: the state.
  - Return an observable.
- Do not subscribe to the function, but pipe it. If there is an error, you can send an empty observable and the router will not proceed to the route.

In the component, must subscribe to the activated route:

```
constructor(private activatedRoute: ActivatedRoute) { }
users: any[];
ngOnInit() {
  this.activatedRoute.data.subscribe((data: { users: any }) => {
  this.users = data.users;
  });
}
```

- We first avoid the annoying checks that must be done at the HTML level so that we don't have problems until our data is received.
- Secondly, they allow us to focus more on the user experience as we can stop navigating if a data error occurs while fetching them, without having to load the preview component.
- We can also do more before completing the navigation, such as attaching more logic or mapping the data before accessing the loaded component.
