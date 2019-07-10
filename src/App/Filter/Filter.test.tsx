//libs
import React from 'react';
import ReactDOM from "react-dom";

//ours
import Filter from './Filter';

// Just a basic sanity check
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Filter selectedLevels={[1,10,7]} setSelectedLevels={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});


