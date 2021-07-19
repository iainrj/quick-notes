# quick-notes

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

## Notes about app
The notes are all stored in the vuex store, this means that on app load the notes are "loaded" from the fake api and put into the store.

Adding a new note and deleting notes also go directly to the store and then the app interface uses the `mapGetters` to get the notes and the note metadata inside
the components.

The app uses Typescript (not massively), so the business logic types are in the `appTypes.ts` file in the services folder.

Jest tests are in the `test/unit` folder and can be run with `yarn test:unit`

Screenshots of the app in different states are in the screenshots folder and the components that make up the app are in the components folder.

## Notes about task
The ability to delete wasn't totally clear, so I implemented a method that can delete any number of notes by their `ID`. I decided to allow a user to
delete multiple at a time as there was a select all checkbox in the header of the id column. To help with the ux of this I added a note about which notes
were being deleted by showing their ID's.

In the new note modal, I added a message to tell the user that they must have one of title or content to save the note, as the save button would not work according
to the validation rules if that was missing.

The column sorting implemented is quite simple, the `id` column is sorted by number ascending or descending and the `title`, `content`, and `status` columns are sorted in alphabetical or reverse alphabetical order. The status column didn't have a clear order for sorting, so I left it as alphabetical. The sorting could be changed to
have a certain order of "New", "Not completed" and "Completed" according to the best case for the user.
