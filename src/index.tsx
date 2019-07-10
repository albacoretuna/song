// nothing much hapenning here, go to App.tsx instead

// some IE polyfills
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';

ReactDOM.render(<App />, document.getElementById('root'));

