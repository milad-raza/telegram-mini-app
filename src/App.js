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

  function expand (){
    const tg = window?.Telegram?.WebApp;
    try {
      tg.Telegram.WebApp.ready()
      tg.Telegram.WebApp.expand()
    }
    catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    // if (window.Telegram && window.Telegram.WebApp) {
    //   const tg = window.Telegram.WebApp;

    //   if (typeof tg.requestView === 'function') {
    //     tg.requestView('full');
    //   } else {
    //     console.warn('requestView method is not available in the Telegram WebApp API');
    //   }
    //   tg.expand();
    // }
    expand()
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
