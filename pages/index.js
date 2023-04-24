import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { AE_AMOUNT_FORMATS } from '@aeternity/aepp-sdk';
import useAeternitySDK from '../hooks/useAeternitySDK';
import { useEffect, useRef, useState } from "react";
import { walletDetector, BrowserWindowMessageConnection, AeSdkAepp, Node } from '@aeternity/aepp-sdk'

export default function Home() {
  const client = useAeternitySDK();
  const address = useRef(null);
  const balance = useRef(null);

	const fetchAccount = async (sdk) => {
		// let addressFromSDK = 
    // console.log(addressFromSDK)
    address.current = sdk.address
    // console.log(typeof(sdk.address))
    // balance.current = await sdk.getBalance('ak_293sRou862Dj8LpndbsU4aP815S6v6AhNsZJ2TSgqKLhuaWnYp')
    // console.log(balance.current)

    // balance.value = await state.aeSdk.getBalance(state.aeSdk.address, {
    //   format: AE_AMOUNT_FORMATS.AE,
    // })
		// let balance = await sdk.baladdressFromSDKance(current, {
		// 	format: AE_AMOUNT_FORMATS.AE
		// });

		// console.log("Current Address:", address);
		// console.log("Current Balance:", balance + AmountFormatter.AE_AMOUNT_FORMATS.AE);	
	}

  if (client) fetchAccount(client);



  return (
    <div className={styles.container}>
        <header className="App-header">
        <p>
					{
						client
						? address.current
						: "Account not connected"
					}
				</p>
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://thirdweb.com/">thirdweb</a>!
        </h1>

        <p className={styles.description}>
          Get started by configuring your desired network in{" "}
          <code className={styles.code}>pages/_app.js</code>, then modify the{" "}
          <code className={styles.code}>pages/index.js</code> file!
        </p>

        <div className={styles.connect}>
          <ConnectWallet />
        </div>

        <div className={styles.grid}>
          <a href="https://portal.thirdweb.com/" className={styles.card}>
            <h2>Portal &rarr;</h2>
            <p>
              Guides, references and resources that will help you build with
              thirdweb.
            </p>
          </a>

          <a href="https://thirdweb.com/dashboard" className={styles.card}>
            <h2>Dashboard &rarr;</h2>
            <p>
              Deploy, configure and manage your smart contracts from the
              dashboard.
            </p>
          </a>

          <a
            href="https://portal.thirdweb.com/templates"
            className={styles.card}
          >
            <h2>Templates &rarr;</h2>
            <p>
              Discover and clone template projects showcasing thirdweb features.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}
