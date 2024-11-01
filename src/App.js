// import '@telegram-apps/telegram-ui/dist/styles.css';

// import { AppRoot, Placeholder } from '@telegram-apps/telegram-ui';

// const App = () => (
//   <AppRoot>
//     <Placeholder
//       header="Title"
//       description="Description"
//     >
//       <img
//         alt="Telegram sticker"
//         src="https://xelene.me/telegram.gif"
//         style={{ display: 'block', width: '144px', height: '144px' }}
//       />
//     </Placeholder>
//   </AppRoot>
// );

// export default App;


import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  function expand() {
    const tg = window?.Telegram?.WebApp;
    if (tg) {
      try {
        tg.ready();
        tg.expand();
      } catch (e) {
        console.log("Error expanding:", e);
      }
    } else {
      console.warn("Telegram WebApp not detected.");
    }
  }
  

  window?.Telegram?.WebApp.onEvent('viewportChanged', function() {
    window?.Telegram.WebApp.expand();
});

  useEffect(() => {
    // Wait a bit to ensure Telegram WebApp SDK is loaded
    const timer = setTimeout(() => expand(), 500);
    return () => clearTimeout(timer);
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
