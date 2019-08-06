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
