import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
const loadTelegramSdk = async () => {
  const WebApp = await import('@twa-dev/sdk');
  return WebApp;
};

function App() {
  const [userData, setUserData] = useState({})

  window?.Telegram?.WebApp.onEvent('viewportChanged', function () {
    window?.Telegram.WebApp.expand();
  });

  useEffect(() => {
    loadTelegramSdk().then((tg) => {
      console.log(tg?.default?.initDataUnsafe, "tggg")
      setUserData(tg?.default?.initDataUnsafe?.user ?? tg?.default?.initDataUnsafe ?? {})
    }).catch(error => {
      console.error("Failed to initialize Telegram SDK:", error);
    });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to My Telegram Mini-App
        </p>

        {userData && <ul>
          {Object.entries(userData).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {typeof value === 'string' ? value : JSON.stringify(value)}
            </li>
          ))}
        </ul>}

      </header>
    </div>
  );
}

export default App;
