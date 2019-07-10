# Song list


## Demo

See it live at https://treemendous.netlify.com/

## Install

```
npm install
```

## Develop

```
npm start
```

## Tests
To run unit and integration tests
```
npm test
```

To run end to end tests in browser
Make sure the app is running on localhost:3000, then

```
npm run cypress:open
```

## Deployment
With every push to master, CI will automatically run tests and deploy the app to https://treemendous.netlify.com/

## Features

  * fetch JSON data
  * TypeScript
  * List the trees
  * On click open the photos of the tree
  * Filter trees by name
  * Mobile friendly

## Ideas for improvement

  * What if the API return tones of photos? Some infinite scrolling or pagination
  * API schema validation
  * Error reporting, so that we know what goes wrong before users need to tell us
