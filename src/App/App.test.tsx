// I spent more time on end to end testing using Cypress instead of unit testing
// just "npm run cypress:open" to see end to end tests run in a real browser


//libs
import React from 'react';
import ReactDOM from "react-dom";

//ours
import App from './App';

// Just a basic sanity check
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


