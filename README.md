# ViewChild in Angular2

There are situations when a **Parent Component** needs to interact with **Child Component** so we will discuss a solution for 
those cases in this writeup.

To be more elaborate let us a take a small example. Suppose there is a small game which has multiple **components** as given below:

1. `GameComponent` - This is the parent **component**.
2. `GameBoardComponent` - The Game board **component** which has the actual game.
3. `GameResetComponent` - **Component** which would be responsible for resetting the game.

There are multiple ways to achieve the interaction between the above **components**, and one of them is **ViewChild**.

So, a user starts playing the game and after he notices no valid moves are left, he plans to reset the game. He clicks on the `Reset` 
button which is the part of the `GameResetComponent(Child Component)`. The `GameResetComponent(Child Component)` then 
interacts with `GameComponent (Parent Component)` and would request for reset. The `GameComponent(Parent Component)` would 
then reset the game board by interacting with `GameBoardComponent(Child Component)` in order to reset the board.

Notice two interactions here:

1. Child **Component** to Parent **Component** : `GameResetComponent` -> `GameComponent`
2. Parent **Component** to Child **Component** : `GameComponent` -> `GameBoardComponent`

The scheme of interactions discussed above is based on the **Mediator Design Pattern**. **Parent** **Component** is acting as a 
**central authority** which is responsible for communication between **child** **components**.

Well, we would be discussing 2nd interaction in this blog i.e. **Parent** to **Child**. So suppose when a **parent** **component** needs 
to call a **child** **component** function, it can inject **child** **component** as a **ViewChild** in **parent component**.

Let's take a very small example to demonstrate this:

Below is a child **component** that has a very simple functionality - It has some text which can be shown/hidden and there is a `Show/Hide Text` 
button that toggles the visibility of that text.

Text is hidden by default and once the user clicks on the button, `toggleVisibility` function is called, which also sends the source in the 
parameters as from where the function has been called.

**child.component.ts**
```TypeScript
import {Component} from '@angular/core';

@Component({
    selector: 'child-component',
    template: `
    <div>
        <h2>Child Component</h2>
        <div class="text">
            <span [hidden]="!showText">I am visible now! Thanks to {{visibilitySource}}</span>
        </div>
        <div>
            <button (click)="toggleVisibility('Child Component')">Show/Hide Text</button>
        </div>
    </div>
    `,
    styles: ['.text { margin-bottom: 10px; color:red}']
})

export class ChildComponent {
    showText:Boolean = false;
    visibilitySource:String = '';

    toggleVisibility(source) {
        this.showText = !this.showText;
        this.visibilitySource = source;
    }
}
```

And here is the **parent** **component** for that **child** **component**:

**app.component.ts**
```TypeScript
import {Component} from '@angular/core';
import {ChildComponent} from './child.component';

@Component({
    selector: 'my-app',
    template: `
    <div>
        <h1>Parent Component</h1>
        <button (click)="showHideText()">Show/Hide Child Component Text</button>
        <child-component></child-component>
    </div>
    `,
    directives: [ChildComponent]
})

export class AppComponent {
    showHideText() {
        // TODO: Access child component to toggle text visibility
    }
}
```

Now assume, **parent** **component** also wants to show/hide the text displayed by the **child** **component**, so to achieve that we need to do 
the following:

1. Import **ViewChild** from `@angular/core`. So now first line of our `app.component.ts` would look like:
    `import {Component,ViewChild} from '@angular/core';`
    In the above line we have imported the **ViewChild**, an annotation provided by **Angular2** for getting reference of child **components**.

2. Let's add the following snippet to our AppComponent class:
    `@ViewChild(ChildComponent) private childComponent:ChildComponent;`
    We are querying the `ChildComponent` using `@ViewChild` property decoration and injecting it to private `childComponent` property.

This `childComponent` property will now provide us access to the child **component**. We know that our child **component** i.e. `ChildComponent` 
has a `toggleVisibility` function that shows/hides text and also displays the source which made it visible. In the code below we have 
defined the `showHideText` method which then calls the `toggleVisibility` function through `childComponent` property.

```TypeScript
showHideText(){
    this.childComponent.toggleVisibility('Parent Component');
}
```

If we combine all the parts, our `app.component.ts` would now look as:

```TypeScript
import {Component, ViewChild} from '@angular/core';
import {ChildComponent} from './child.component';

@Component({
    selector: 'my-app',
    template: `
    <div>
        <h1>Parent Component</h1>
        <button (click)="showHideText()">Show/Hide Child Component Text</button>
        <child-component></child-component>
    </div>
    `,
    directives: [ChildComponent]
})

export class AppComponent {
    @ViewChild(ChildComponent) private childComponent:ChildComponent;

    showHideText() {
        this.childComponent.toggleVisibility('Parent Component');
    }
}
```

In **Angular2** there are multiple ways of interaction between **components**, **ViewChild** is just one of them!