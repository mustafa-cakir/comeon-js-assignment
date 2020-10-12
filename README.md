This project was derived from [ComeOn JavaScript Test](https://github.com/comeon-group/comeon-javascript-test) and bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Run on localhost

to run the project on localhost, run:

```
git clone git@github.com:mustafa-cakir/comeon-js-assignment.git
cd comeon-js-assignment

yarn install
yarn dev
```

These commands will run;

-   Mock API (json-server) at `:3001`
-   React project at `:3000`

on your localhost

### External libraries and packages used on this assignment;

#### Dependecies

-   `React`
-   `axios` for API request handling (offers many advantages over `fetch()`)
-   `prop-type` for runtime type checking for React props
-   `query-string` for parsing and stringifing the URL strings with ease
-   `redux` for managing application-level state (i.e: auth)
-   `redux-thunk` to write async logic that interacts with the redux store
-   `semantic-ui` for UI and grids

#### Dev Dependecies

-   `json-server` to run the mock API
-   `concurrently` to run the server and client commands concurrently
-   `eslint (airbnb, prettier, ...etc)` to improve the coding quality
