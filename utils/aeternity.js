import {
	Node,
	AeSdkAepp,
  walletDetector,
	BrowserWindowMessageConnection,
} from "@aeternity/aepp-sdk";
import nodeConfig from "../configs/node";

let client;

/**
 * Scan for user Wallet
 * 
 * @returns {bool} Wallet connection status
 */
// const scanForWallets = () => {
// 	if (!client) throw new Error("Execute aeternitySDK first");
//   const scannerConnection = new BrowserWindowMessageConnection({
//     connectionInfo: { id: 'spy' }
//   });
//   const detector = WalletDetector({ connection: scannerConnection });

// 	return new Promise((resolve) => {
//     detector.scan(async ({ newWallet }) => {
//       if (!newWallet) return;

// 			await client.connectToWallet(await newWallet.getConnection())
// 			await client.subscribeAddress("subscribe", "current")

// 			detector.stopScan()
// 			resolve(true);
//     });
//   });
// };

const scanForWallets = () => {
  console.log('here is it')
  return new Promise((resolve) => {
    const handleWallets = async ({ wallets, newWallet }) => {
      newWallet = newWallet || Object.values(wallets)[0]
      if (confirm(`Do you want to connect to wallet ${newWallet.info.name} with id ${newWallet.info.id}`)) {
        console.log('newWallet', newWallet)
        stopScan()

        await client.connectToWallet(newWallet.getConnection())
        const { address: { current } } = await client.subscribeAddress('subscribe', 'connected')
        // this.$store.commit('aeSdk/setAddress', Object.keys(current)[0])
        resolve(newWallet)
      }
    }

    const scannerConnection = new BrowserWindowMessageConnection()
    const stopScan = walletDetector(scannerConnection, handleWallets)
  })
}

/**
 * Wallet connection method 
 * 
 * @returns {Object} RpcAepp client
 */



export const aeternitySDK = async () => {
  // if (client) {console.log('already connected'); return};
  try {
    const node = {
      nodes: [
        {
          name: nodeConfig.testnet.name,
          instance: await new Node({
            url: nodeConfig.testnet.url,
            internalUrl: nodeConfig.testnet.middlewareUrl,
          }),
        },
				{
          name: nodeConfig.mainnet.name,
          instance: await new Node({
            url: nodeConfig.mainnet.url,
            internalUrl: nodeConfig.mainnet.middlewareUrl,
          }),
        }
      ],
      compilerUrl: nodeConfig.compilerUrl,
    };
    client = new AeSdkAepp({
      name: 'Simple æpp',
			...node,
			onNetworkChange: async (params) => {
				client.selectNode(params.networkId);
			},
      // onAddressChange: ({ current }) => commit('setAddress', Object.keys(current)[0]),
      onDisconnect: () => alert('Aepp is disconnected'),
    });

    console.log('scan')
		await scanForWallets();

    return client;
  } catch (err) {
    console.error("SDK not loaded correctly", err);
    return;
  }
};
