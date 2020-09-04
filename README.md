<b>Todo app using React with hooks</b>

App was built using React functional components with the best current practices to my knowledge.

You can view this app @ https://todo-with-react-hooks.netlify.app/

### `npm install`

### `npm start`

### `npm test`

<b>Recent additions:</b>

- App uses fake data from https://jsonplaceholder.typicode.com/
- App creates different lists derived from different userId's from fake data
- New and updated items are posted to jsonplaceholder and responses are handled as they would be in more real application. Same goes for deleting items.
- Moving Todo-item is allowed withing the same userId
- Todo-items title, complete-status and lists on where it appears on can all be edited, also Todo-item can be copied to another list
- Data persist on localStorage, If one wants to reset localStorage it can be done with clicking button "Clear memory"

---

<b>Earlier additions:</b>

- Added autofocus & required attributes to Input component
- Added aria-labels for accessibility
- Fixed a bug coming from using ordered ids
- Added dark mode
- Renamed components and variables to describe them more accurate
- Stored some CSS properties into variables for better maintenance

---

<b>Original message</b>

> This app is intended as a React pre-task for applying to **\*\*** as a developer.
>
> <b>Tasks:</b>
>
> 1.  Refactor this app with the following criterion:
>
> - Use only functional components
> - Give it a good architectural structure
> - Change the UI look to something better. You choose the style.
>
> 2.  Write unittests to test 1 component well.
