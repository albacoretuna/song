# Song list
A react app that lists songs. 

## Demo

https://songs-nick.netlify.app/

(the backend might be sleeping, refresh the page after a minute until it wakes up)

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

## Requirements checklist

 [checkbox:checked] The frontend must be built using [ReactJs](https://reactjs.org/)

- [x] You must use the provided API
- [x] Songs are displayed in an infinite scroll list
- [x] While songs are being fetched, a loader should be displayed
- [x] Songs can be filtered by level (song level goes from 1 to 15)
- [x] Songs can be searched
- [x] Songs can be added to favorite
- [x] Songs can be removed from favorite
- [x] The website must be responsive

Bonus
---
- [X] Add some tests
- [X] Want to show off? You can add any feature you desire
      End to end tests, deploying to a custom url, having deploy pipeline setup etc. 


## Ideas for improvement
  * Responsiveness can be improved.
  * Browser compatibility was ignored. I fixed the major problems on IE11, so that users can still use the app even though the layou is a bit broken. 
  * Improving the performance of the list by rendering only the visible ones
  * Error handling is totally absent. 
