//libs
import React from 'react';
import ReactDOM from "react-dom";

//ours
import Card from './Card';

// mock data
const song =  {
    "id": "5b8e47deb3984c68ed8192e3",
    "title": "Easter Oratorio (in Am)",
    "artist": "Johann Sebastian Bach",
    "images": "https://d3mzlbmn9ukddk.cloudfront.net/songs/image/586a75fa-99df-4ce0-af71-55f6a474c404.jpg",
    "level": 6,
    "search": "johann sebastian bach easter oratorio (in am)"
};


// Just a basic sanity check
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Card song={song} index={1} isFavorite={true} favorites={[]} setFavorites={()=>{}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});


