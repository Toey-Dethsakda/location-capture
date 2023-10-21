// src/App.js
import React from 'react';
import './App.css';
import LocationCapture from './components/LocationCapture';
import Locat from './components/Locat';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LocationCapture />
      </header>
    </div>
  );
}

export default App;
