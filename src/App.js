import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;

      if (typeof tg.requestView === 'function') {
        tg.requestView('full');
      } else {
        console.warn('requestView method is not available in the Telegram WebApp API');
      }

      tg.expand();

      tg.MainButton.show();
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to My Telegram Mini-App
        </p>
      </header>
    </div>
  );
}

export default App;
