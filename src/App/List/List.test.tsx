//libs
import React from 'react';
import ReactDOM from "react-dom";

//ours
import List from './List';

// mock data
const loadedSongs =  [{
    "id": "5b8e47deb3984c68ed8192e3",
    "title": "Easter Oratorio (in Am)",
    "artist": "Johann Sebastian Bach",
    "images": "https://d3mzlbmn9ukddk.cloudfront.net/songs/image/586a75fa-99df-4ce0-af71-55f6a474c404.jpg",
    "level": 6,
    "search": "johann sebastian bach easter oratorio (in am)"
}];


// Just a basic sanity check
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<List loadedSongs={loadedSongs} favorites={[]} setFavorites={()=>{}} setIsFetching={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});


