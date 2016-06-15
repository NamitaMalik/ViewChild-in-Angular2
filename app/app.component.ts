/**
 * Created by namita on 6/12/16.
 */

import {Component} from '@angular/core';
import {ChildComponent} from './child.component';

@Component({
    selector: 'my-app',
    template: `
    <div>
    Hello World
    <child-component></child-component>
    </div>
    `,
    directives:[ChildComponent]
})

export class AppComponent {

}