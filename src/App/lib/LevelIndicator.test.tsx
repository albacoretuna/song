//libs
import React from 'react';
import ReactDOM from "react-dom";

//ours
import LevelIndicator from './LevelIndicator';

// Just a basic sanity check
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LevelIndicator level={10} />, div);
  ReactDOM.unmountComponentAtNode(div);
});


