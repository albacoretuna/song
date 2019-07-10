# Song list


## Demo


## Install

```
# 1. in the root folder, to get frontend dependencies
npm install

# 2. in api folder for to get backend dependencies
cd api && npm install

# 3. start the app
npm start
```

It should run the server and also open a browser to your app.

Make sure you got ports 3000 and 3004 free :)


## Tests

To run end to end tests in the browser
Make sure the app is running and then:

```
npm run cypress
```

To view the tests being run in a browser window:

```
npm run cypress:open
```

To run unit and integration tests
```
npm test
```


```
npm run cypress:open
```

## Ideas for improvement

  * Improving the performance of the list by rendering only the visible ones
  * Error handling
