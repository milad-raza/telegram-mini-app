import React, { useEffect, useState } from "react";
import { TonConnectUI, TonConnectButton } from "@tonconnect/ui";
import logo from "./logo.svg";
import "./App.css";
const loadTelegramSdk = async () => {
  const WebApp = await import("@twa-dev/sdk");
  return WebApp;
};

function App() {
  const [userData, setUserData] = useState({});
  const [wallet, setWallet] = useState(null);

  window?.Telegram?.WebApp.onEvent("viewportChanged", function() {
    window?.Telegram.WebApp.expand();
  });

  const tonConnectUI = new TonConnectUI({
    manifestUrl:
      "https://telegram-mini-app-rouge-omega.vercel.app/tonconnect-manifest.json",
  });

  useEffect(() => {
    loadTelegramSdk()
      .then((tg) => {
        console.log(tg?.default?.initDataUnsafe, "tggg");
        setUserData(
          tg?.default?.initDataUnsafe?.user ?? tg?.default?.initDataUnsafe ?? {}
        );
      })
      .catch((error) => {
        console.error("Failed to initialize Telegram SDK:", error);
      });

    // Listen for wallet connection changes
    const unsubscribe = tonConnectUI.onStatusChange((walletInfo) => {
      if (walletInfo) {
        console.log("Wallet Connected:", walletInfo);
        setWallet(walletInfo);
      } else {
        console.log("Wallet Disconnected");
        setWallet(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to My Telegram Mini-App</p>

        {userData && (
          <ul>
            {Object.entries(userData).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong>{" "}
                {typeof value === "string" ? value : JSON.stringify(value)}
              </li>
            ))}
          </ul>
        )}
      </header>

      <h1>TON Connect Wallet</h1>

      {/* TON Connect Button */}
      <TonConnectButton />

      {/* Show wallet address */}
      {wallet ? (
        <p>Wallet Address: {wallet.account.address}</p>
      ) : (
        <p>Please connect your wallet</p>
      )}
    </div>
  );
}

export default App;

// // import React, { useEffect, useState } from "react";
// // import { Web3AuthNoModal } from "@web3auth/no-modal";
// // import { CHAIN_NAMESPACES } from "@web3auth/base";

// // const clientId = "BAOENfg7mO2fzku4z1B1j5VVIUcd_aU5eFdE7WJU-xa5ViRxvkvlxywd4tDI446DxLJHio_FPEWyzYR3DgE8WvE"; // Your Web3Auth client ID

// // // TON Chain configuration for Web3Auth
// // const chainConfig = {
// //   chainNamespace: CHAIN_NAMESPACES.OTHER,
// //   chainId: "0x1",
// //   rpcTarget: "https://testnet.toncenter.com/api/v2/jsonRPC?api_key=34b4571526b447e29eb4d73357d1c8372f338ea8cc5833bebf24bce8328960f2", // Your TON Center API key
// //   displayName: "TON Testnet",
// //   blockExplorer: "https://testnet.tonscan.org",
// //   ticker: "TON",
// //   tickerName: "TON",
// // };

// // const App = () => {
// //   const [web3auth, setWeb3auth] = useState(null);
// //   const [connected, setConnected] = useState(false);

// //   useEffect(() => {
// //     const initWeb3Auth = async () => {
// //       try {
// //         const web3authInstance = new Web3AuthNoModal({
// //           clientId,
// //           enableLogging: true,
// //           chainConfig,
// //           web3AuthNetwork: "sapphire_devnet",
// //         });

// //         await web3authInstance.init();
// //         setWeb3auth(web3authInstance);
// //       } catch (error) {
// //         console.error("Error initializing Web3Auth:", error);
// //       }
// //     };

// //     initWeb3Auth();
// //   }, []);

// //   const handleConnect = async () => {
// //     if (!web3auth) return;
// //     try {
// //       await web3auth.login();
// //       setConnected(true);
// //     } catch (error) {
// //       console.error("Error connecting wallet:", error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>TON Wallet Connection</h1>
// //       {connected ? (
// //         <p>Connected to TON Wallet!</p>
// //       ) : (
// //         <button onClick={handleConnect}>Connect to Wallet</button>
// //       )}
// //     </div>
// //   );
// // };

// // export default App;

// import { useEffect, useState } from "react";
// import { Web3Auth, decodeToken } from "@web3auth/single-factor-auth";
// import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
// import { CommonPrivateKeyProvider } from "@web3auth/base-provider";
// import { getHttpEndpoint } from "@orbs-network/ton-access";
// import { useAuth0 } from "@auth0/auth0-react";
// import "./App.css";

// const testnetRpc = await getHttpEndpoint({
//   network: "testnet",
//   protocol: "json-rpc",
// });
// const verifier = "w3a-a0-github-demo";
// const clientId =
//   "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";

// const chainConfig = {
//   chainNamespace: CHAIN_NAMESPACES.OTHER,
//   chainId: "testnet",
//   rpcTarget: testnetRpc,
//   displayName: "TON Testnet",
//   blockExplorerUrl: "https://testnet.tonscan.org",
//   ticker: "TON",
//   tickerName: "Toncoin",
// };

// const privateKeyProvider = new CommonPrivateKeyProvider({
//   config: { chainConfig },
// });

// // Initialize Web3Auth with necessary configurations
// const web3authSfa = new Web3Auth({
//   clientId,
//   web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
//   usePnPKey: false,
//   privateKeyProvider,
// });

// export default function App() {
//   const [isLoggingIn, setIsLoggingIn] = useState(false);
//   const [loggedIn, setLoggedIn] = useState(false);
//   const { isAuthenticated, isLoading, getIdTokenClaims, loginWithRedirect, logout: auth0Logout } = useAuth0();
//   const [provider, setProvider] = useState(null);

//   useEffect(() => {
//     const init = async () => {
//       try {
//         await web3authSfa.init();
//         if (web3authSfa.status === "connected") {
//           setLoggedIn(true);
//           setProvider(web3authSfa.provider);
//         }
//       } catch (error) {
//         console.error("Error during Web3Auth initialization:", error);
//       }
//     };

//     init();
//   }, []);

//   const login = async () => {
//     if (!web3authSfa) {
//       console.log("Web3Auth Single Factor Auth SDK not initialized yet");
//       return;
//     }
//     if (web3authSfa.status === "not_ready") {
//       await web3authSfa.init();
//     }
//     await loginWithRedirect();
//   };

//   // Attempt to connect to Web3Auth when authenticated
//   const connectWeb3Auth = async () => {
//     if (isAuthenticated && !loggedIn && web3authSfa.status === "ready") {
//       try {
//         setIsLoggingIn(true);
//         const idToken = (await getIdTokenClaims())?.__raw; // Retrieve raw ID token from Auth0
//         if (!idToken) {
//           console.error("No ID token found");
//           return;
//         }
//         const { payload } = decodeToken(idToken); // Decode the token to access its payload

//         // Connect to Web3Auth using the verifier, verifierId, and idToken
//         await web3authSfa.connect({
//           verifier,
//           verifierId: (payload).sub,
//           idToken: idToken,
//         });
//         // Update state to reflect successful login
//         setIsLoggingIn(false);
//         setLoggedIn(true);
//         setProvider(web3authSfa.provider);
//       } catch (err) {
//         setIsLoggingIn(false);
//         console.error("Error during Web3Auth connection:", err);
//       }
//     }
//   };

//   useEffect(() => {
//     connectWeb3Auth();
//   }, [isAuthenticated, loggedIn, getIdTokenClaims]);

//   const loginView = (
//     <>
//       <div className="flex-container">
//         {/* <div>
//           <button onClick={getUserInfo} className="card">
//             Get User Info
//           </button>
//         </div>
//         <div>
//           <button onClick={authenticateUser} className="card">
//             Authenticate User
//           </button>
//         </div> */}
//         <div>
//           {/* <button onClick={getAccounts} className="card">
//             Get Accounts
//           </button> */}
//         </div>
//         {/* Add more buttons and implement the corresponding functions as per your need */}
//         ...
//       </div>

//       <div id="console" style={{ whiteSpace: "pre-line" }}>
//         <p style={{ whiteSpace: "pre-line" }}></p>
//       </div>
//     </>
//   );

//   const logoutView = (
//     <button onClick={login} className="card">
//       Login
//     </button>
//   );

//   return (
//     <div className="container">
//       <h1 className="title">
//         <a target="_blank" href="https://web3auth.io/docs/sdk/core-kit/sfa-web" rel="noreferrer">
//           Web3Auth
//         </a>{" "}
//         SFA React Ton GitHub Example
//       </h1>

//       {isLoading || isLoggingIn ? "<Loading />" : <div className="grid">{web3authSfa ? (loggedIn ? loginView : logoutView) : null}</div>}

//     </div>
//   );

// }

// import React from "react";
// import { getHttpEndpoint } from "@orbs-network/ton-access";
// import TonWeb from "tonweb";

// export default function Withdrawal() {
//   const publicKey = new Uint8Array(
//     Object.values(JSON.parse(localStorage.getItem("publicKey")))
//   );
//   async function handleWithdraw() {
//     const privateKey = localStorage.getItem("privateKey");

//     if (!publicKey || !privateKey) {
//       console.error("Public key or Private key is missing");
//       return;
//     }

//     // Convert publicKey and privateKey from hex to 32-byte Uint8Array
//     const publicKeyUint8Array = Uint8Array.from(Buffer.from(publicKey, "hex"));
//     const privateKeyUint8Array = Uint8Array.from(
//       Buffer.from(privateKey, "hex")
//     );

//     console.log({
//       privateKey,
//       privateKeyUint8Array,
//       publicKey,
//       publicKeyUint8Array,
//     });

//     // Verify that both keys are 32 bytes in length
//     if (
//       publicKeyUint8Array.length !== 32 ||
//       privateKeyUint8Array.length !== 32
//     ) {
//       console.error(
//         "Invalid key length: public or private key is not 32 bytes"
//       );
//       return;
//     }

//     // Create 64-byte key by combining private and public key arrays
//     const expandedPrivateKey = new Uint8Array(64);
//     expandedPrivateKey.set(privateKeyUint8Array); // First 32 bytes
//     expandedPrivateKey.set(publicKeyUint8Array, 32); // Next 32 bytes

//     console.log("publicKeyUint8Array:", publicKeyUint8Array);
//     console.log("expandedPrivateKey:", expandedPrivateKey);

//     // Initialize TonWeb client on testnet
//     const endpoint = await getHttpEndpoint({ network: "testnet" });
//     const tonweb = new TonWeb(new TonWeb.HttpProvider(endpoint));

//     // Open wallet v4R2
//     const WalletClass = tonweb.wallet.all["v4R2"];
//     const wallet = new WalletClass(tonweb.provider, {
//       publicKey: publicKeyUint8Array,
//     });

//     // Retrieve current seqno
//     const seqno = (await wallet.methods.seqno().call()) || 0;
//     console.log("Current seqno:", seqno);

//     // Transfer 0.05 TON
//     await wallet.methods
//       .transfer({
//         secretKey: expandedPrivateKey,
//         toAddress: "EQA4V9tF4lY2S_J-sEQR7aUj9IwW-Ou2vJQlCn--2DLOLR5e",
//         amount: TonWeb.utils.toNano("0.05"), // 0.05 TON
//         seqno: seqno,
//         payload: "Hi", // Optional comment
//         sendMode: 3,
//       })
//       .send();

//     // Wait until transaction is confirmed
//     let currentSeqno = seqno;
//     while (currentSeqno === seqno) {
//       console.log("Waiting for transaction confirmation...");
//       await sleep(1500);
//       currentSeqno = (await wallet.methods.seqno().call()) || 0;
//     }
//     console.log("Transaction confirmed!");
//   }

//   function sleep(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   }

//   const handleAddress = () => {};

//   return (
//     <>
//       <button onClick={handleWithdraw}>Withdraw</button>{" "}
//       <button onClick={handleAddress}>address</button>
//     </>
//   );
// }
