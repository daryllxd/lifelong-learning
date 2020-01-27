# Sharing Modules
[Reference](https://angular.io/guide/sharing-ngmodules)

``` typescript
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerComponent } from './customer.component';
import { NewItemDirective } from './new-item.directive';
import { OrdersPipe } from './orders.pipe';

@NgModule({
 imports:      [ CommonModule ],
 declarations: [ CustomerComponent, NewItemDirective, OrdersPipe ],
 exports:      [ CustomerComponent, NewItemDirective, OrdersPipe,
                 CommonModule, FormsModule ]
})
export class SharedModule { }
```

- Importing the `CommonModule` because the module's component needs common directives.
- It declares and exports the utility pipe, directive, and component classes.
- Re-exporting `CommonModule`: Needed so that any module that imports this will have access to directives like `NgIF` and `NgFor` from `CommonModule`.
- Re-exporting `FormsModule`: Needed so we have access to `(ngModel)`.
- *Import modules when you want to use directives, pipes, and components.* Importing a module with services means that you will have a new instance of that service, which typically is not what you need (typically one wants to reuse an existing service). Use module imports to control service instantiation.
- *The most common way to get a hold of shared services is through Angular dependency injection, rather than through the module system (importing a module will result in a new service instance, which is not a typical usage).*

# `ng-book`

- Every app has a main entry point: `ng` will look at `angular.json` to find the entry point to the app.
  - `angular.json` specifies the "main" file, which is usually `main.ts`.
  - `main.ts` is the entry point for our app and it bootstraps our application.
  - The bootstrap process boots an Angular module, in this case it's `AppModule`.
  - `AppModule` specifies which component to use as the top-level component, in this case it's `AppComponent`.
- `NgModule` has 4 keys:
  - `declarations`: These specifies the components that are defined in this module. You have to declare components in an `NgModule` before you can use them in your templates.
  - It's sort of like a package and `declarations` states which components are owned by this module.
  - `ng generate` assumes that when we generate a component, we want it to belong to the current `NgModule`.
- `imports`
  - This specifies which dependencies this module has.
  - `import` at the top of the file is to get access to the file.
  - `imports` means you want to use dependency injection for that module.
- `providers`: use for DI, to make a service available to be injected throughout the application, we add it there.

# Understanding Angular Modules
[Reference](https://frontend.consulting/understanding-angular-modules)

```
export interface NgModule {
    providers?: Provider[];
    declarations?: Array<Type<any> | any[]>;
    imports?: Array<Type<any> | ModuleWithProviders<{}> | any[]>;
    exports?: Array<Type<any> | any[]>;
    entryComponents?: Array<Type<any> | any[]>;
    bootstrap?: Array<Type<any> | any[]>;
    id?: string;
    schemas?: Array<SchemaMetadata | any[]>;
    jit?: true;
}
```

- `declarations`: Importing components, directives, and pipes.
- `providers`: Defining services that have been decorated with the `Injectable` decorator, which makes them accessible via Angular DI.
- `imports`: Used for importing other modules.
- `exports`: By default, everything defined in a module is private. `exports` is an array that allows the declarations and the declarations within a module accessible from the modules that import the module where these are defined.
- `entryComponents`: Specifies the list of components compiled when the module is bootstrapped. *These components are not components defined in a template, but are normally loaded imperatively: for example using `ViewContainerRef.createComponent()`.*
- `bootstrap`: Specifies components compiled when the module is bootstrapped and automatically adds them to `entryComponents`.
  - `schemas`: can be `NO_ERRORS_SCHEMA` or `CUSTOM_ELEMENTS_SCHEMA`.

## 5 Different Types of Modules

- Domain modules
- Routed modules
- Routing modules
- Service modules
- Widget modules
- `AppModule` (the root module) is the module responsible for bootstrapping the whole application, that means we need to import into the `AppModule` all the modules and providers that are required for running the application.
  - This module usually imports core Angular modules, shared modules, domain modules, service modules, and `AppRoutingModule` - and it bootstraps the root component, usually called the `AppComponent`.
  - Anything that can be lazy-loaded should not be imported in this module. If we only need a service contained in a module in a lazy-loaded route, we only import it in that route's module.
  - It declares and bootstraps only the root component, imports other modules, can declare providers, and doesn't export anything.
- `AppServerModule`: Used for server-side rendering for the app.
- `SharedModule`: A module responsible for hosting all shared entities that will be provided to every module of the application.
  - *When you find that services or components can be reused across different teams and projects and that ideally don't change very often, you may want to build an Angular library rather than hosting your files locally.*
- ***Domain Modules***
  - Only export the top component
  - Rarely declare providers
  - Can be imported by `AppModule` or other Domain modules
- ***Routing modules***
  - Declare the routes of a domain module, passing the configuration to the module, and for defining guards and resolvers services.
  - `AppRoutingModule` defines routes using `forRoot` property, while all other use `forChild`.
  - Can declare resolvers and guards as providers, and not any other service.
  - Always export `RouterModule`.
  - Do not declare anything.
- ***Routed modules***
  - Can declare components, pipes, directives, rarely declares providers.
  - Exports `RouterModule`.
  - **Never imported, importing it won't make it lazy-loaded, instead, it's referenced by the relative routing module.**

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'profile-page',
        loadChildren: './profile-page/profile-page.module#ProfilePageModule'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
```

- ***Service modules***
  - They handle logic without any references to UI that leads to highly-reusable pieces of logic that can be used by different domain modules.
  - Messaging
  - State management.
  - ***They only define providers, and are imported by Domain modules.***
- ***Widget modules***
  - Collect and export declarations.
  - Components are not containers.

Even if you do not remember all the rules, ask yourself these questions when writing a module which will help you architect modules according to the guidelines:

- Should this particular component/service be imported?
- Should these declarations be private/public?
- Should these declarations be part of a separate Widget Module?
- Should these services be defined here, or should they live in a Service Module?
- Should this group of components be a smaller domain module?

# Entry Components
[Reference](https://angular.io/guide/entry-components)

- An entry component is any component that Angular loads imperatively (which means you're not referencing it in the template), by type.
- You specify it by bootstrapping it in an `NgModule`, or including it in a routing definition.
- Declared in the template: declarative. Load imperatively: `entryComponents`.
- Though the `@NgModule` has an `entryComponents` array, most of the time, you won't have to explicitly set any entry components because Angular add components listed in `@NgModule.bootstrap` and those in route definitions to entry components automatically.
  - Angular compiler only generates code for components which are reachable from the `entryComponents`: adding more references to `@NgModule.declarations` does not imply that they will necessarily be included in the final bundle.
  - ***If a component isn't an entry component and isn't found in a template, the tree shaker will throw it away. So, it's best to add only the components that are truly entry components to help keep your app as trim as possible.***
