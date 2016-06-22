# ViewChild-in-Angular2

There are situations when a **parent component** needs to interact with **child component** and we will discuss a solution for those cases in this writeup.

To be more elaborate let us a take a small example. Suppose there is a small game which has multiple components as given below:

1. GameComponent - This is the parent component.
2. GameBoardComponent - The Game board component which has the actual game.
3. GameResetComponent - Component which would be responsible for resetting the game.

There are multiple ways to achieve the interaction between the above **components**, and one of them is **ViewChild**.

So, a user starts playing the game and after he no valid moves are left, he plans to reset the game. He clicks on the `Reset` button which is the part of
the GameResetComponent(child component). The GameResetComponent(child component) then interacts with (GameComponent)parent component and would request for reset. The GameComponent(parent component) would then reset the game board by interacting with GameBoardComponent in order to reset the board.

Notice two interactions here:

1. Child Component to Parent Component : GameResetComponent -> GameComponent
2. Parent Component to Child Component : GameComponent -> GameBoardComponent

Well, we would be discussing 2nd interaction in this blog i.e. **Parent** to **Child**. So suppose when a **parent component** needs to call a **child component** function, it can inject **child component** as a **ViewChild** in **parent component**.

Let's take a very small example to demonstrate this:




